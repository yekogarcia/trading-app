import { Form, Input, Modal } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { InputText, SelectBox, Uploader } from "./InputsDymanic";
const url_files = process.env.REACT_APP_URL_FILES;

export const CreateForm = ({ prms, visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const edit = useSelector((state) => state.edit);

  let fileList = [];
  // console.log(edit);
  if (edit.eventEdit) {
    const icon = edit.eventEdit.icon;
    console.log(url_files)
    fileList = [
      {
        uid: "-1",
        name: icon,
        status: "done",
        url: `${url_files}${icon}`,
        thumbUrl: `${url_files}${icon}`,
      },
    ];
    const datEdit = edit.eventEdit;
    delete datEdit.key;
    form.setFieldsValue(datEdit);
  }

  return (
    <Modal
      key="modal_dinamyc"
      visible={visible}
      title="Ingrese datos"
      okText="Aceptar"
      cancelText="Cancelar"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            console.log(values);
            if (typeof values.icon.file !== "undefined") {
              values.icon = "img/" + values.icon.file.response.file;
            }
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        key="form_dynamic"
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item name="id" label="id" key="id" hidden>
          <Input key="id" />
        </Form.Item>
        {prms.map((pr) =>
          pr.type_input == "text" ||
          pr.type_input == "textArea" ||
          pr.type_input == "money" ? (
            <InputText key="inputText" prms={pr} />
          ) : pr.type_input == "selectBox" ? (
            <SelectBox key="selectBox" rms={pr} />
          ) : pr.type_input == "upload" ? (
            <Uploader key="uploader" prms={pr} file={fileList} />
          ) : (
            console.log("hola")
          )
        )}
      </Form>
    </Modal>
  );
};
