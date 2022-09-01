import { UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Checkbox,
  DatePicker,
  InputNumber,
  Radio,
  Select,
  Switch,
  Button,
  message,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSelectDinamicTable } from "../../../actions/config-menu";
const { Option } = Select;

export const TypeInput = ({ prms }) => {
  let { required, field, label, type_input } = prms;
  required == "NO" ? (required = false) : (required = true);
  const onChange = () => {};
  switch (type_input) {
    case "textArea":
      return (
        <Form.Item
          key={label}
          name={field}
          rules={[{ required: required }]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "4px 4px",
          }}
        >
          <Input.TextArea placeholder={label} key={field} />
        </Form.Item>
      );
    case "money":
      return (
        <Form.Item
          key={label}
          name={field}
          rules={[{ required: required }]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "4px 4px",
          }}
        >
          <InputNumber
            key={field}
            defaultValue={0}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={onChange}
          />
        </Form.Item>
      );
    default:
      return (
        <Form.Item
          key={label}
          name={field}
          rules={[{ required: required }]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "4px 4px",
          }}
        >
          <Input placeholder={label} key={field} />
        </Form.Item>
      );
  }
};

export const InputText = ({ prms }) => {
  return <TypeInput prms={prms} />;
};

export const SelectBox = ({ prms }) => {
  let { required, field, label, tabla } = prms;
  required == "NO" ? (required = false) : (required = true);
  const [selects, setSelects] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("dispatch");
    dispatch(getSelectDinamicTable(tabla)).then(function (res) {
      setSelects(res);
      console.log(selects);
    });
  }, []);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <Form.Item
      name={field}
      rules={[{ required: required }]}
      style={{
        display: "inline-block",
        width: "calc(50% - 8px)",
        margin: "4px 4px",
      }}
    >
      <Select
        key={field}
        showSearch
        placeholder={label}
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {selects.map(({ id, name }) => (
          <Option key={id} value={id}>
            {name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const Uploader = ({ prms, file }) => {
  console.log(prms);
  console.log(file);
  let { required, field, label, type_input } = prms;
  required == "NO" ? (required = false) : (required = true);

  const url = process.env.REACT_APP_URL_UPLOAD;
  const props = {
    name: "myFile",
    action: url,
    listType: "picture",
    defaultFileList: [...file],
    maxCount: 1,
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      console.log(info);
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Form.Item
      name={field}
      rules={[{ required: required }]}
      style={{
        display: "inline-block",
        width: "calc(50% - 8px)",
        margin: "4px 4px",
      }}
    >
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Form.Item>
  );
};
