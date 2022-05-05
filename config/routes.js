/*
 * @Author: your name
 * @Date: 2022-04-27 15:46:07
 * @LastEditTime: 2022-04-29 14:39:56
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cydt-chz\config\routes.js
 */
export default [
  {
    path: '/user',
    // 不使用模板
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/home',
    name: 'home',
    // 路由页面显示图标
    icon: 'HomeOutlined',
    component: './Home',
  },
  {
    path: '/todo',
    name: 'todo',
    // 路由页面显示图标
    icon: 'UnorderedListOutlined',
    component: './Todo',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];
