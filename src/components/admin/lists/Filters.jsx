import { CopyOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Tooltip,
} from "antd";
import React from "react";
const { Option } = Select;
const { RangePicker } = DatePicker;

export const Filters = ({ filters }) => {
  const [form] = Form.useForm();
  const options = {};

  console.log(filters);
  return (
    <div className="contain-filters">
      <div>
        <div className="site-input-group-wrapper">
          <Form form={form}>
            <Input.Group compact>
              {filters.map(({ label, name, type }) => {
                // console.log(label)
                switch (type) {
                  case "input":
                    return (
                      <Form.Item
                        key={name}
                        name={name}
                        rules={[
                          {
                            requiered: true,
                            message: "Es requerido el buscar",
                          },
                        ]}
                      >
                        <Input
                          style={{
                            width: "100%",
                          }}
                          placeholder="Buscar"
                          // defaultValue="input content"
                        />
                      </Form.Item>
                    );
                  case "range_date":
                    return (
                      <Form.Item
                        key={name}
                        name={name}
                        rules={[
                          {
                            requiered: true,
                            message: "Es requerido el buscar",
                          },
                        ]}
                      >
                        <RangePicker
                          style={{
                            width: "100%",
                          }}
                        />
                      </Form.Item>
                    );
                  case "selectBox":
                    return true;
                  // <Select defaultValue="Option1-1">
                  //   <Option value="Option1-1">Option1-1</Option>
                  //   <Option value="Option1-2">Option1-2</Option>
                  // </Select>
                  default:
                    break;
                }
              })}
              <Button type="primary">Buscar</Button>
            </Input.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};
