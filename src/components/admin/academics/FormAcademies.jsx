import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Table,
  Button,
  Modal,
} from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addUsers,
  getProfiles,
  getSelectDinamicTable,
} from "../../../actions/config-menu";
import { Uploader } from "../forms/InputsDymanic";
import { addRow } from "../lists/actionsList";
import { FormSectionsCourses } from "./FormSectionsCourses";

export const FormAcademies = ({
  visible,
  setVisible,
  data,
  setData,
  fieldValues,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  // console.log(fieldValues);
  form.setFieldsValue(fieldValues);

  fieldValues = [];

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleCreateCourse = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };


  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      visible: false,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "name",
    },
    {
      title: "Clases",
      dataIndex: "lesson",
      key: "lesson",
    },
  ];

 

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const [checkStrictly, setCheckStrictly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const file = [];

  const openFormSection = () => {
    setIsModalOpen(true);
  };
  const handleRemoveSection = () => {
  };

  return (
    <>
      <Drawer
        title="Crear curso"
        width={820}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onCancel}>Cancelar</Button>
            <Button
              type="primary"
              onClick={handleCreateCourse}
              className="btn-create"
            >
              Guardar
            </Button>
          </Space>
        }
      >
        <FormSectionsCourses
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          columns={columns}
          sections={sections}
          setSections={setSections}
        />

        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={8}>
              <Uploader
                prms={{ field: "img_course", required: "NO" }}
                file={file}
              />
            </Col>
            <Col span={24}>
              <Form.Item name="id" label="Id" hidden>
                <Input placeholder="Please enter Id" key="id" />
              </Form.Item>
              <Form.Item
                name="name"
                label="Nombre del curso"
                rules={[
                  {
                    required: true,
                    message: "Please enter user name",
                  },
                ]}
              >
                <Input key="name" placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="description" label="Descripción">
                <Input.TextArea
                  style={{
                    width: "100%",
                  }}
                  key="description"
                  placeholder="Please enter description"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Space>
              <Button
                type="primary"
                onClick={() => openFormSection()}
                className="btn-create"
              >
                Agregar
              </Button>
              <Button
                type="primary"
                onClick={handleRemoveSection}
                className="btn-delete"
                danger
              >
                Eliminar
              </Button>
            </Space>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Table
                width="100%"
                columns={columns}
                rowSelection={{ ...rowSelection, checkStrictly }}
                dataSource={sections}
              />
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
