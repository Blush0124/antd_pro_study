/*
 * @Author: your name
 * @Date: 2022-04-28 13:52:48
 * @LastEditTime: 2022-04-29 14:30:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cydt-chz\src\pages\Todo\index.jsx
 */
import React, { useEffect, useState, useRef } from 'react';
import { Button, Alert, Modal, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import ProForm, { ProFormText, proFormText } from '@ant-design/pro-form';
import { addTodo, setStatus } from '@/services/todo';

// 不同的状态显示不同的alert
const status = [
  <Alert message="待办" type="info" showIcon />,
  <Alert message="已完成" type="success" showIcon />,
  <Alert message="已取消" type="error" showIcon />,
];
// 0 待办 1完成 2 取消

const Todo = (props) => {
  //   在头部avtarDropdown中已经dispatch过，更新了状态
  /* useEffect(() => {
    props.dispatch({
      type: 'todos/fetchTodos',
      payload: null,
    });
  }, []); */

  //   是否显示添加对话框
  const [isModalVisible, setModalVisible] = useState(false);
  //   表格列设置
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',

      //   record为每一个数据对象,根据对象的status 渲染不同的alert
      render: (_, record) => status[record.status],
    },
    {
      title: '修改状态',
      render: (_, record) => {
        let edits = [];
        const { status } = record;
        if (status != 0) {
          edits.push(
            //   点击修改状态为待办
            <a onClick={() => changeStatus(record.id, 0)} key={0}>
              待办{' '}
            </a>,
          );
        }
        if (status != 1) {
          edits.push(
            <a onClick={() => changeStatus(record.id, 1)} key={1}>
              完成{' '}
            </a>,
          );
        }
        if (status != 2) {
          edits.push(
            <a onClick={() => changeStatus(record.id, 2)} key={2}>
              取消{' '}
            </a>,
          );
        }
        return edits;
      },
    },
  ];
  // 改变状态回调
  const changeStatus = async (id, status) => {
    //   请求接口改变状态
    const res = await setStatus({ id, status });

    // 如果修改成功
    if (res.code === 0) {
      // 重新dispatch
      getData();
    } else {
      message.error(res.message);
    }
  };
  /* const inputRef = useEffect(); */
  const handleCancel = () => {
    setModalVisible(false);
  };
  const handleOpen = () => {
    setModalVisible(true);
  };
  const handleFinish = async (value) => {
    // 调接口增加数据
    const res = await addTodo(value);
    if (res.code === 0) {
      // 增加成功后重新dispatch 更新status
      getData();
      message.success(res.message);
      setModalVisible(false);
    } else {
      message.error(res.message);
    }
  };
  //   获取最新的state
  const getData = () => {
    props.dispatch({
      type: 'todos/fetchTodos',
      payload: null,
    });
  };
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        dataSource={props.todos}
        rowKey="id"
        search={false}
        dateFormatter="string"
        headerTitle="待办事项"
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={handleOpen}>
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
      <Modal title="添加待办事项" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <ProForm onFinish={(value) => handleFinish(value)}>
          <ProFormText name="todo" label="待办事项" rules={[{ required: true }]} />
        </ProForm>
      </Modal>
    </PageContainer>
  );
};

export default connect(({ todos }) => ({ todos: todos.todoList }))(Todo);
