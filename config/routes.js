/*
 * @Author: your name
 * @Date: 2022-04-27 15:46:07
 * @LastEditTime: 2022-05-05 15:40:10
 * @LastEditors: Blush0124 848415857@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cydt-chz\config\routes.js
 */
export default [
  {
    path: '/login',
    // 不使用模板
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/login',
        component: './Login',
      },
      {
        component: './404',
      },
    ],
  },

  {
    path: '/',
    redirect: '/home',
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
    component: './404',
  },
];
