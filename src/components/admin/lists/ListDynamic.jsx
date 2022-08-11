import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addRowDynamicTable,
  deleteRowTables,
  getParamsTable,
} from "../../../actions/config-menu";
import { OptionsLists } from "./OptionsLists";
import { sendNotTypesEdit, sendTypesEdit } from "../../../actions/actionsTypes";
import { CreateForm } from "../forms/CreateForm";

export const ListDynamic = () => {
  const columns = [];
  const [data, setData] = useState([]);
  const [params, setParams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const dispatch = useDispatch();
  let { table } = useParams();

  useEffect(() => {
    setLoading(true);
    const pm = dispatch(getParamsTable(table));
    pm.then(function (p) {
      console.log(p);
      setParams(p.params);
      setData(p.data);
      setLoading(false);
    });
  }, []);

  const prms = [];
  const addColumns = (column, param) => {
    if (param.label == "") {
      param.label = column;
    }
    if (param.visible == "SI") {
      columns.push({
        key: column,
        title: param.label,
        dataIndex: column,
        sorter: true,
        // render: (name) => `${name.first} ${name.last}`,
      });
      param.field = column;
      param.table = table;
      prms.push(param);
    }
  };

  const onCreate = (values) => {
    values.table = prms[0].table;
    // console.log("Received values of form: ", values);
    const dat = dispatch(addRowDynamicTable(values));
    dat.then(function (dt) {
      console.log(dt);
      // setData(dt);
      if (dt.length > 0) {
        const datNew = [...data];
        const index = data.findIndex((b) => b.id == dt[0].id);
        if (index > -1) {
          const item = datNew[index];
          datNew.splice(index, 1, { ...item, ...dt[0] });
          console.log(datNew);
          setData(datNew);
        } else {
          setData([...data, dt[0]]);
        }
        // setNewDat([]);
      }
    });
    setVisible(false);
    dispatch(sendNotTypesEdit());
  };

  const handleUpdate = (e) => {
    setVisible(true);
    dispatch(sendTypesEdit(e));
  };

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteRowTables(id, table));
    const newDat = data.filter((item) => item.id !== id);
    setData(newDat);
  };

  const options = OptionsLists(handleDelete, handleUpdate);
  options.forEach((o) => {
    columns.push(o);
  });

  params.map(({ column_name, col_description }) =>
    addColumns(column_name, JSON.parse(col_description))
  );

  const handleTableChange = (newPagination, filters, sorter) => {};

  return (
    <div className="ct">
      <div className="filters">
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          Nuevo
        </Button>
        <CreateForm
          key="formdimayc"
          prms={prms}
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
            dispatch(sendNotTypesEdit());
            // form.resetFields();
          }}
        />
      </div>
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
  );
};
