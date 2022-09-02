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
import {
  addUsers,
  getProfiles,
  getSelectDinamicTable,
} from "../../../actions/config-menu";
import { addRow } from "../lists/actionsList";
const { Option } = Select;

export const FormUsers = ({
  visible,
  setVisible,
  data,
  setData,
  fieldValues
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState([]);
  const [academies, setAcademies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(false);

  useEffect(() => {
    dispatch(getProfiles()).then(function (pr) {
      setProfile(pr);
    });
    dispatch(getSelectDinamicTable("academies")).then(function (pr) {
      setAcademies(pr);
    });
  }, []);

  // console.log(fieldValues);
  fieldValues.password = "password";
  form.setFieldsValue(fieldValues);
  
  fieldValues = [];

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onClose = () => {
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
        values.academy =
          typeof values.academy !== "undefined" ? values.academy : [];
        const academy = [];
        values.academy.map((val) => academy.push(val[0]));
        console.log(academy);
        values.academy = JSON.stringify(academy);
        values.photo_profile =
          typeof values.myFile !== "undefined" &&
          values.myFile !== null
            ? "img/" + values.myFile.file.response.file
            : "";
        console.log(values);
        setLoading(true);
        dispatch(addUsers(values)).then((res) => {
          if (res) {
            const datNew = addRow(data, res);
            setData(datNew);
            form.resetFields();
            setVisible(false);
          }
          setLoading(false);
        });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  let options = [];
  academies.map(({ key, name }) => options.push({ label: name, value: name }));

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
        title="Crear curso"
        width={720}
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
              onClick={handleCreateUser}
              className="btn-create"
            >
              Guardar
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="myFile"
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
                  action={process.env.REACT_APP_URL_UPLOAD}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  // fileList={[]}
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
              <Form.Item name="id" label="Id" hidden>
                <Input placeholder="Please enter Id" />
              </Form.Item>
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
              <Form.Item name="academy" label="Academia">
                <Cascader
                  style={{ width: "100%" }}
                  options={options}
                  onChange={onChange}
                  multiple
                  maxTagCount="responsive"
                  // defaultValue={}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
