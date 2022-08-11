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
import {
  getEstudents,
  getUsers,
  updateStateRow,
} from "../../../actions/config-menu";
import { ColumnsList } from "../lists/ColumnsList";
import { Filters } from "../lists/Filters";
import { OptionsBlock } from "../lists/OptionsLists";
import { FormUsers } from "./FormUsers";

export const Users = () => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const fecha = moment().format("YYYY-MM-DD HH:MM");
  console.log(fecha);

  useEffect(() => {
    dispatch(getUsers()).then(function (e) {
      console.log(e);
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
      label: "Nombre",
      name: "name",
      filter: "order.search",
      width: "wp-150",
    },
    {
      label: "Email / Usuario",
      name: "email",
      width: "wp-200",
      filter: "order.search",
    },
    {
      label: "Celular",
      name: "cell_phone",
      width: "wp-150",
      filter: "search",
    },
    {
      label: "Fecha y hora",
      name: "create_datetime",
      width: "wp-200",
      filter: false,
    },
    {
      label: "Estado",
      name: "state",
      width: "wp-100",
      filter: "order",
    },
    {
      label: "Perfil",
      name: "profile",
      width: "wp-100",
      filter: "order",
    },
    {
      label: "Fecha activación",
      name: "activate_datetime",
      filter: false,
    },
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

  const handleUpdate = () => {};

  const handleActivation = ({ id, state }) => {
    console.log(id);
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

  const contextMenu = (record, setShow) => {
    console.log(record);
    return (
      <div className="options">
        <div>
          {/* <a onClick={() => handleUpdate(record)}> */}
          <a>
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
                setShow(false);
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
                setShow(false);
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
          <h2>Usuarios</h2>
        </header>
        {/* <Filters filters={filters} /> */}
        <Button
          type="primary"
          onClick={() => setVisible(true)}
          icon={<PlusOutlined />}
        >
          New account
        </Button>
        <FormUsers visible={visible} setVisible={setVisible} />
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
