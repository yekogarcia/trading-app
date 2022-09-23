import { Button, Form, Input, Modal, Space, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { FormClassSection } from "./FormClassSection";

export const FormSectionsCourses = ({
  isModalOpen,
  setIsModalOpen,
  columns,
  sections,
  setSections
}) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [lessons, setLessons] = useState([]);

  const handleOk = () => {
    form
    .validateFields()
    .then((values) => {
      console.log(values);
      values.key = values.name;
      values.children = lessons
      setSections([...sections, values]);
      form.resetFields();
      setLessons([]);
      setIsModalOpen(false);
    })
    .catch((info) => {
      console.log("Validate Failed:", info);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openFormClass = () => {
    setOpen(true);
  };

  console.log(lessons);

  return (
    <Modal
      title="Agregar secciones del curso"
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width="800px"
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
        <Space>
          <Button
            type="primary"
            onClick={() => openFormClass()}
            className="btn-create"
          >
            Agregar
          </Button>
          <Button type="primary" onClick="" className="btn-delete" danger>
            Eliminar
          </Button>
        </Space>
        <FormClassSection
          open={open}
          setOpen={setOpen}
          setLessons={setLessons}
          lessons={lessons}
        />
        <Table width="100%" columns={columns} dataSource={lessons} />
      </Form>
    </Modal>
  );
};
