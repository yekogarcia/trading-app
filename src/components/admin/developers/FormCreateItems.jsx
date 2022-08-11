import { Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { sendNotTypesEdit } from "../../../actions/actionsTypes";
import { getAllTables, getParamsTable } from "../../../actions/config-menu";
import { ListEditForm } from "./ListEditForm";
const { Option } = Select;

export const FormCreateItems = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");

  const edit = useSelector((state) => state.edit);

  if (edit.eventEdit) {
    const datEdit = edit.eventEdit;
    form.setFieldsValue({
      table_name: datEdit.table_name,
      name: datEdit.name,
      id: datEdit.id,
    });
    setTimeout(() => {
      dispatch(onChange(datEdit.table_name));
    }, 300);
  }

  const [allTables, setAllTables] = useState([]);

  useEffect(() => {
    console.log("useEfect");
    const allTab = dispatch(getAllTables());
    allTab.then(function (all) {
      setAllTables(all.data);
    });
  }, []);

  const onChange = (value) => {
    const pm = dispatch(getParamsTable(value));
    pm.then(function (p) {
      const originData = [];
      for (let i = 0; i < p.params.length; i++) {
        let pr = p.params[i];
        let des = JSON.parse(pr.col_description);
        let vis = "SI";
        let type_input = "text";
        let tabla = "";
        let label = "";
        let required = "NO";
        if (des) {
          if (des.visible == "NO") {
            vis = "NO";
          }
          required = des.required;
          type_input = des.type_input;
          tabla = des.tabla;
          label = des.label;
        }
        originData.push({
          key: pr.column_name,
          column: pr.column_name,
          visible: vis,
          required: required,
          type_input: type_input,
          tabla: tabla,
          label: label,
        });
      }
      console.log(originData);
      setData(originData);
      dispatch(sendNotTypesEdit());
    });
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <Modal
      width="80%"
      visible={visible}
      title="Crear nueva tabla dinamica"
      okText="Crear"
      cancelText="Cancelar"
      onCancel={()=>{
        setEditingKey("")
        onCancel()
        form.resetFields();
        setData([])
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            if (data.editingKey) {
              Swal.fire(
                "",
                "Tienes un row sin confirmar, valide por favor! column " +
                  data.editingKey,
                "warning"
              );
              return;
            }
            form.resetFields();
            onCreate(values, data);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item name="id" label="id" hidden>
          <Input placeholder="Ingrese id" />
        </Form.Item>
        <Form.Item
          name="table_name"
          label="Tabla"
          rules={[
            {
              required: true,
              message: "Por favor ingrese algún valor al campo!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a table"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            onSelect={onChange}
            onFocus={onChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {allTables.map(({ tablename }) => (
              <Option key={tablename} value={tablename}>
                {tablename}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="name"
          label="Nombre"
          rules={[
            {
              required: true,
              message: "Por favor ingrese algún valor al campo!",
            },
          ]}
        >
          <Input placeholder="Ingrese el nombre que quiera que se visualice" />
        </Form.Item>
        <ListEditForm data={data} setData={setData} allTables={allTables} editingKey={editingKey} setEditingKey={setEditingKey} />
      </Form>
    </Modal>
  );
};
