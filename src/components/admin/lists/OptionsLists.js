import {
  AlignLeftOutlined
} from '@ant-design/icons';
import { Popconfirm, Popover } from "antd";
import { useState } from 'react';


export const OptionsLists = (handleDelete, handleUpdate) => {
  const dat = [
    {
      title: "Eliminar",
      dataIndex: "delete",
      width: "70px",
      render: (_, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.key)}
        >
          <a>Delete</a>
        </Popconfirm>
      ),
    },
    {
      title: "Editar",
      dataIndex: "edit",
      width: "70px",
      render: (_, record) => (
        // data.length >= 1 ? (
        <Popconfirm
          title="Sure to delete?"
          // okText="Si" cancelText={falce}
          // onConfirm={() => handleUpdate(record.key)}
          onConfirm={() => handleUpdate(record)}
        >
          <a>Editar</a>
        </Popconfirm>
      ),
      // ) : null,
    },
  ];
  return dat;
};


export const OptionsBlock = (contextMenu) => {
  const [show, setShow] = useState(false);

  const handleVisibleChange = (newVisible) => {
    setShow(newVisible);
  };

  return ([{
    title: "Options",
    dataIndex: "options",
    className: "wp-100",
    render: (_, record) => (
      <Popover
        title=""
        content={() => contextMenu({ ...record }, setShow)}
        trigger="click"
        placement="right"
        visible={show}
        onVisibleChange={handleVisibleChange}
      >
        <a onClick={() => setShow(true)}><AlignLeftOutlined /></a>
      </Popover>
    )
  }]);
};
