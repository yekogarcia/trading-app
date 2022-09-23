import {
  EditOutlined,
  StopOutlined,
  CheckCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { Button, Popconfirm, Table } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUsers, updateStateRow } from "../../../actions/config-menu";
import { ColumnsList } from "../lists/ColumnsList";
import { Filters } from "../lists/Filters";
import { OptionsBlock, OptionsLists } from "../lists/OptionsLists";
import { FormAcademies } from "./FormAcademies";

export const ListAcademies = () => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("List");

  const [data, setData] = useState([]);
  const [fieldValues, setFieldValues] = useState([]);

  const dispatch = useDispatch();
  let { id, name } = useParams();

  useEffect(() => {
    setTitle(name);
    
  }, [name])
 

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const fecha = moment().format("YYYY-MM-DD HH:MM");

  useEffect(() => {
    dispatch(getUsers()).then(function (e) {
      setData(e);
      setLoading(false);
    });
  }, []);

  const cols = [
    {
      label: "ID",
      name: "id",
      filter: "order",
      width: "wp-50",
    },
    {
      label: "Nombre del curso",
      name: "name",
      filter: "order.search",
      width: "wp-300",
    },
    {
      label: "Descripción",
      name: "description",
      width: "wp-300",
      filter: "order.search",
    },
    {
      label: "Icono / Imagen",
      name: "icon",
      width: "wp-300",
      filter: false
    }
  ];

  const filters = [
    {
      label: "Buscar",
      name: "search",
      type: "input",
    },
    {
      label: "Fecha",
      name: "fecha",
      type: "range_date",
    },
  ];

  const handleUpdate = (record) => {
    setVisible(true);
    console.log(record);
    delete record.key;
    delete record.activate_datetime;
    delete record.code_referred;
    delete record.company;
    delete record.create_datetime;
    delete record.id_center;
    delete record.id_plans;
    delete record.referral_code;
    delete record.state;
    delete record.user_login;
    delete record.token;
    const academy = [];
    record.academy.forEach((pr) => {
      academy.push([pr]);
    });
    record.academy = academy;
    if(record.photo_profile){
      
      const fileList = [
        {
          uid: "-1",
          name: record.photo_profile,
          status: "done",
          url: `${process.env.REACT_APP_URL_FILES}${record.photo_profile}`,
          thumbUrl: `${process.env.REACT_APP_URL_FILES}${record.photo_profile}`,
        },
      ];
      record.photo_profile = fileList;
    }
    console.log(record);
    setFieldValues(record);
  };

  const handleActivation = ({ id, state }) => {
    let new_state = "";
    state === "ACTIVO" ? (new_state = "INACTIVO") : (new_state = "ACTIVO");
    dispatch(updateStateRow(id, "users", new_state));
    const datNew = [...data];
    const index = data.findIndex((dat) => dat.id == id);
    if (index > -1) {
      const items = datNew[index];
      const item = datNew[index];
      item.state = new_state;
      datNew.splice(index, 1, { ...items, ...item });
      setData(datNew);
    }
  };

  const contextMenu = (record) => {
    return (
      <div className="options">
        <div>
          <a onClick={() => handleUpdate(record)}>
            <EditOutlined />
            Actualizar datos
          </a>
        </div>
        <div>
          {record.state === "ACTIVO" ? (
            <Popconfirm
              title="Esta seguro de inactivar este usuario?"
              onConfirm={() => {
                handleActivation(record);
              }}
            >
              <a>
                <StopOutlined />
                Inactivar
              </a>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Esta seguro de activar este usuario?"
              onConfirm={() => {
                handleActivation(record);
              }}
            >
              <a>
                <CheckCircleOutlined />
                Activar
              </a>
            </Popconfirm>
          )}
        </div>
      </div>
    );
  };

  const block = OptionsBlock(contextMenu);
  let columns = ColumnsList(cols, data);
  columns = block.concat(columns);

  const handleTableChange = () => {};
  return (
    <div className="ct">
      <div className="page-table">
        <header className="head-table">
          <h2>{title}</h2>
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
              setFieldValues([]);
            }}
            icon={<PlusOutlined />}
          >
            Nuevo
          </Button>
        </header>
        {/* <Filters filters={filters} /> */}
        <FormAcademies
          visible={visible}
          setVisible={setVisible}
          data={data}
          setData={setData}
          fieldValues={fieldValues}
        />
        <div className="table">
          <Table
            columns={columns}
            // rowKey={(record) => record.login.uuid}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            size="middle"
          />
        </div>
      </div>
    </div>
  );
};
