/*
 * @Author: your name
 * @Date: 2022-04-27 15:46:07
 * @LastEditTime: 2022-05-05 15:34:02
 * @LastEditors: Blush0124 848415857@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cydt-chz\src\components\RightContent\AvatarDropdown.jsx
 */
import React, { useCallback, useEffect } from 'react';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Spin, Badge, message } from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { outLogin } from '@/services/ant-design-pro/api';
import { connect } from 'umi';

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  // loading
  const load = message.loading('退出中...');
  await outLogin();
  const { query = {}, search, pathname } = history.location;
  const { redirect } = query; // Note: There may be security issues, please note

  if (window.location.pathname !== '/login' && !redirect) {
    history.replace({
      pathname: '/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
  load.hide();
};

const AvatarDropdown = ({ menu, todos, dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'todos/fetchTodos',
      payload: null,
    });
  }, []);
  let newNumebr = todos.filter((item) => item.status === 0).length;
  const { initialState, setInitialState } = useModel('@@initialState');
  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }
      if (key === 'todo') {
        history.push('/todo');
        return;
      }

      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}
      <Menu.Item key="todo">
        <UnorderedListOutlined />
        待办事项
        <Badge count={newNumebr} offset={[10, 0]} />
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>
          {currentUser.name}
          <Badge count={newNumebr} dot={true} />
        </span>
      </span>
    </HeaderDropdown>
  );
};

export default connect(({ todos }) => ({ todos: todos.todoList }))(AvatarDropdown);
