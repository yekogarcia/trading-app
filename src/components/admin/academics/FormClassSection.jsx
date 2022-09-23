import { Form, Input, Modal } from "antd";
import { Uploader } from "../forms/InputsDymanic";

export const FormClassSection = ({ open, setOpen, setLessons, lessons }) => {
  const [form] = Form.useForm();
  
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        if (typeof values.lesson !== "undefined" && values.lesson.length > 0) {
          values.lesson = "video/" + values.lesson[0].response.file;
        }
        values.key = values.name;
        setLessons([...lessons, values]);
        form.resetFields();
        setOpen(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const openFormClass = () => {
    setOpen(false);
  };

  const file = [];

  return (
    <Modal
      title="Agregar clases"
      visible={open}
      onOk={handleOk}
      onCancel={handleCancel}
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
        <Form.Item name="id" label="id" hidden>
          <Input key="id" />
        </Form.Item>
        <Form.Item
          style={{
            display: "inline-block",
            width: "calc(100% - 8px)",
            margin: "4px 4px",
          }}
          name="name"
          label="Nombre sección"
        >
          <Input key="name" />
        </Form.Item>
        <Form.Item
          style={{
            display: "inline-block",
            width: "calc(100% - 8px)",
            margin: "4px 4px",
          }}
          name="description"
          label="Descripción sección"
        >
          <Input.TextArea key="description" />
        </Form.Item>
        <Uploader
          prms={{ field: "lesson", required: "NO" }}
          file={file}
          type={`VIDEO`}
        />
      </Form>
    </Modal>
  );
};
