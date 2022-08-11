import {
  EditOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Modal, Popconfirm, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPaymentsUser, updateStateRow } from "../../../actions/config-menu";
import { ColumnsList } from "../lists/ColumnsList";
import { OptionsBlock } from "../lists/OptionsLists";

export const Payments = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [visible, setVisible] = useState(false);
  const [idUser, setIdUser] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaymentsUser()).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  console.log(data);

  const cols = [
    {
      label: "ID",
      name: "id",
      filter: "order",
      width: "wp-50",
    },
    {
      label: "Id user",
      name: "id_user",
      filter: "false",
      width: "wp-100",
    },
    {
      label: "Nombre",
      name: "name",
      filter: "order.search",
      width: "wp-150",
    },
    {
      label: "Email",
      name: "email",
      width: "wp-200",
      filter: "order.search",
    },
    {
      label: "plan",
      name: "title",
      width: "wp-150",
      filter: false,
    },
    {
      label: "Precio",
      name: "price",
      width: "wp-150",
      filter: false,
    },
    {
      label: "Metodo de pago",
      name: "method",
      width: "wp-200",
      filter: false,
    },
    {
      label: "Fecha pay",
      name: "creation_datetime",
      filter: false,
    },
    {
      label: "Referencia de pago",
      name: "referred_pay",
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
      label: "Fecha activación",
      name: "activate_datetime",
      filter: false,
    },
    {
      label: "Tipo pago",
      name: "type",
      filter: false,
    },
  ];

  const handleOk = () => {
    console.log(idUser);
    dispatch(updateStateRow(idUser, "users", "ACTIVO")).then((pr) => {
      setVisible(false);
    });
  };

  const handleApprove = ({ id, id_user }, state) => {
    if (!state) {
      setVisible(false);
      return;
    }
    let new_state = state;
    dispatch(updateStateRow(id, "users_payments", new_state)).then((pr) => {
      const datNew = [...data];
      const index = data.findIndex((dat) => dat.id == id);
      if (index > -1) {
        const items = datNew[index];
        const item = datNew[index];
        item.state = new_state;
        datNew.splice(index, 1, { ...items, ...item });
        setData(datNew);
      }
      if (new_state == "APROBADO") {
        setVisible(true);
        setIdUser(id_user);
      }
    });
  };

  const contextMenu = (record, setShow) => {
    console.log(record);
    let title = "¿Desea rechazar o aprobar este pago?";
    let okText = "Aprobar";
    let cancelText = "Rechazar";
    let context = "Aprobar / Rechazar";
    let stateOk = "APROBADO";
    let stateCancel = "RECHAZADO";

    if (record.state === "APROBADO") {
      stateOk = "RECHAZADO";
      stateCancel = false;
      title = "¿Desea rechazar este pago?";
      okText = "Rechazar";
      cancelText = "Cancelar";
      context = "Rechazar";
    } else {
      stateOk = "APROBADO";
      stateCancel = false;
      title = "¿Desea aprobado este pago?";
      okText = "Aprobar";
      cancelText = "Cancelar";
      context = "Aprobar";
    }

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
          <Popconfirm
            title={title}
            onConfirm={() => {
              handleApprove(record, stateOk);
              setShow(false);
            }}
            onCancel={() => {
              handleApprove(record, stateCancel);
              setShow(false);
            }}
            okText={okText}
            cancelText={cancelText}
          >
            <a>
              <CheckCircleOutlined />
              {context}
            </a>
          </Popconfirm>
        </div>
      </div>
    );
  };

  const block = OptionsBlock(contextMenu);
  let columns = ColumnsList(cols, data);
  columns = block.concat(columns);

  const handleTableChange = () => {};
  return (
    <>
      <div className="ct">
        <div className="page-table">
          <Modal
            title="Activar usuario"
            visible={visible}
            onOk={handleOk}
            onCancel={() => setVisible(false)}
          >
            <p>El pago fue aprobado exitosamente! ¿Desea activar el usuario?</p>
          </Modal>
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
      ;
    </>
  );
};
