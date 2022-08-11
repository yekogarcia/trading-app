import { Form, Input, Popconfirm, Select, Table, Typography } from "antd";
import { useState } from "react";
const { Option } = Select;

export const ListEditForm = ({
  data,
  setData,
  allTables,
  editingKey,
  setEditingKey,
}) => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: "column",
      dataIndex: "column",
      width: "20%",
    },
    {
      title: "Visible",
      dataIndex: "visible",
      width: "5%",
      editable: true,
    },
    {
      title: "Required",
      width: "5%",
      dataIndex: "required",
      editable: true,
    },
    {
      title: "Type Input",
      width: "20%",
      dataIndex: "type_input",
      editable: true,
    },
    {
      title: "Table",
      width: "20%",
      dataIndex: "tabla",
      editable: true,
    },
    {
      title: "Label",
      width: "20%",
      dataIndex: "label",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      column: "",
      visible: "",
      required: "",
      type_input: "",
      tabla: "",
      label: "",
      ...record,
    });
    setEditingKey(record.key);
    console.log(editingKey);
    data.editingKey = record.column;
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType == "selectBol" ? (
        <Select placeholder="Select">
          <Option value="SI">SI</Option>
          <Option value="NO">NO</Option>
        </Select>
      ) : inputType == "selectType" ? (
        <Select
          showSearch
          placeholder="Select type input"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          <Option value="text">Text</Option>
          <Option value="textArea">TextArea</Option>
          <Option value="money">Money</Option>
          <Option value="number">Number</Option>
          <Option value="selectBox">SelectBox</Option>
          <Option value="checkBox">CheckBox</Option>
          <Option value="upload">Upload</Option>
        </Select>
      ) : inputType == "selectTabla" ? (
        <Select
          showSearch
          placeholder="Select a table"
          optionFilterProp="children"
          // onChange={onChange}
          // onSearch={onSearch}
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
      ) : (
        <Input />
      );

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            // rules={[
            //   {
            //     required: true,
            //     message: `Please Input ${title}!`,
            //   },
            // ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex == "visible" || col.dataIndex == "required"
            ? "selectBol"
            : col.dataIndex == "type_input"
            ? "selectType"
            : col.dataIndex == "tabla"
            ? "selectTabla"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const save = async (key) => {
    try {
      delete data.editingKey;
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const cancel = () => {
    setEditingKey("");
  };

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
