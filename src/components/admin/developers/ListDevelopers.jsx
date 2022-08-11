import { Popconfirm, Table } from "antd";
import "antd/dist/antd.css";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendTypesEdit } from "../../../actions/actionsTypes";
import {
  deleteRowTables,
  getDynamicTables,
  updateStateRow,
} from "../../../actions/config-menu";
import FormDevelopers from "./FormDevelopers";

export const ListDevelopers = () => {
  const dispatch = useDispatch();

  const [tb, setTb] = useState([]);
  const [newDat, setNewDat] = useState([]);
  const [action, setAction] = useState([]);
  const [show, setShow] = useState(false);

  
  if (newDat.length > 0) {
    const datNew = [...tb];
    const index = tb.findIndex((b) => b.id == newDat[0].id);
    if (index > -1) {
      const item = datNew[index];
      datNew.splice(index, 1, { ...item, ...newDat[0] });
      setTb(datNew);
    } else {
      setTb([...tb, newDat[0]]);
    }
    setNewDat([]);
  }

  useEffect(() => {
    const tables = dispatch(getDynamicTables("developers"));
    tables.then(function (pr) {
      console.log(pr);
      if (pr.length > tb.length) {
        setTb(pr);
      }
    });
  }, []);

  const columns = [
    {
      title: "Tabla",
      dataIndex: "table_name",
      className: "wp-200",
      filters: [],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Nombre",
      dataIndex: "name",
      className: "wp-200",
      filters: [],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Estado",
      dataIndex: "state",
      className: "wp-200",
      filters: [],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Config",
      dataIndex: "config",
      className: "wp-100",
      render: (_, record) =>
      tb.length >= 1 && record.state != "ACTIVO" ? (
        <Popconfirm
        title="Sure to activate the item?"
        onConfirm={() => handleActivation(record.id, "ACTIVO")}
        >
            <a>Activate</a>
          </Popconfirm>
        ) : tb.length >= 1 && record.state == "ACTIVO" ? (
          <Popconfirm
          title="Sure to inactivate the item?"
          onConfirm={() => handleActivation(record.id, "INACTIVO")}
          >
            <a>Inactivate</a>
          </Popconfirm>
        ) : null,
      },
      {
        title: "Eliminar",
        dataIndex: "delete",
        className: "wp-100",
        render: (_, record) =>
        tb.length >= 1 ? (
          <Popconfirm
          title="Sure to delete th item?"
          onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
    {
      title: "Editar",
      dataIndex: "edit",
      className: "wp-100",
      render: (_, record) =>
        tb.length >= 1 ? (
          <Popconfirm
            title="Sure to edit the item?"
            onConfirm={() => handleEditItem(record)}
          >
            <a>Editar</a>
          </Popconfirm>
        ) : null,
    },
  ];

  tb.map(({ id, table_name }) =>
    columns[0].filters.push({
      key: id,
      text: table_name,
      value: table_name,
    })
  );

  tb.map(({ id, name }) =>
    columns[1].filters.push({
      text: name,
      value: name,
    })
  );

  const handleDelete = (id) => {
    dispatch(deleteRowTables(id, "yk_tables_dinamyc"));
    const newDat = tb.filter((item) => item.id !== id);
    setTb(newDat);
  };

  const handleEditItem = (e) => {
    e.action = "Editar";
    setAction(e);
    setShow(true);
    dispatch(sendTypesEdit(e));
  };

  const handleActivation = (id, state) => {
    dispatch(updateStateRow(id, "yk_tables_dinamyc", state));
    const datNew = [...tb];
    const index = tb.findIndex((b) => b.id == id);
    if (index > -1) {
      const items = datNew[index];
      const item = datNew[index];
      item.state = state;
      datNew.splice(index, 1, { ...items, ...item });
      setTb(datNew);
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className="ct">
      <div className="filters">
        <FormDevelopers
          setData={setNewDat}
          visible={show}
          setVisible={setShow}
        />
      </div>
      <Table
        columns={columns}
        dataSource={tb}
        onChange={onChange}
        size="small"
        pagination={{
          position: ["none", "bottomCenter"],
          pageSize: 10,
        }}
      />
    </div>
  );
};
