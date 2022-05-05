/*
 * @Author: your name
 * @Date: 2022-04-27 15:46:07
 * @LastEditTime: 2022-05-05 15:26:45
 * @LastEditors: Blush0124 848415857@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cydt-chz\src\app.jsx
 */
import { PageLoading } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import defaultSettings from '../config/defaultSettings';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';
/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  };
  // 如果不是登录页面，执行

  // if (history.location.pathname !== loginPath) {
  const currentUser = await fetchUserInfo();
  return {
    fetchUserInfo,
    currentUser,
    settings: defaultSettings,
  };
  // }

  /* return {
    fetchUserInfo,
    settings: defaultSettings,
  }; */
} // ProLayout 支持的api https://procomponents.ant.design/components/layout

export const layout = ({ initialState, setInitialState }) => {
  console.log(initialState);
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    /* footerRender: () => <Footer />, */
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login

      /* if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      } */
    },
    links: [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {/*  {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({ ...preInitialState, settings }));
              }}
            />
          )} */}
        </>
      );
    },
    ...initialState?.settings,
  };
};
