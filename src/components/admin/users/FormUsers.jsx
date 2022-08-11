import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Cascader,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import { Button } from "antd/lib/radio";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSelectDinamicTable } from "../../../actions/config-menu";
const { Option } = Select;

export const FormUsers = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState([]);
  const [academies, setAcademies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    dispatch(getSelectDinamicTable("profiles")).then(function (pr) {
      setProfile(pr);
    });
    dispatch(getSelectDinamicTable("academies")).then(function (pr) {
      setAcademies(pr);
    });
  }, []);

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };
  const onChange = (value) => {
    console.log(value);
  };
  const handleCreateUser = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  let options = [];
  academies.map(({ id, name }) => options.push({ label: name, value: id }));

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }

    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <Drawer
        title="Crear nuevo usuario"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button
              type="primary"
              onClick={handleCreateUser}
              className="btn-create"
            >
              Crear
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="photo_profile"
                label=""
                rules={[
                  {
                    required: false,
                    message: "Please enter user name",
                  },
                ]}
              >
                <Upload
                  name="myFile"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="http://localhost:4000/api/ad/upload"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: "100%",
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter user name",
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email / Usuario"
                rules={[
                  {
                    required: true,
                    message: "Please enter email",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please enter email"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="cell_phone" label="No. Celular">
                <Input placeholder="Please enter cell phone" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="profile"
                label="Perfil / Rol"
                rules={[
                  {
                    required: true,
                    message: "Please choose the profile",
                  },
                ]}
              >
                <Select placeholder="Please choose the profile">
                  {profile.map(({ id, name }) => (
                    <Option key={id} value={id}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="password" label="Contraseña">
                <Input.Password placeholder="Please enter password" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="academia"
                label="Academia"
                rules={[
                  {
                    required: true,
                    message: "Please select the academics",
                  },
                ]}
              >
                <Cascader
                  style={{ width: "100%" }}
                  options={options}
                  onChange={onChange}
                  multiple
                  maxTagCount="responsive"
                  // defaultValue={["bamboo"]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
