/*
 * @Author: your name
 * @Date: 2022-04-28 14:38:36
 * @LastEditTime: 2022-04-29 14:22:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cydt-chz\src\services\todo.js
 */
import { request } from 'umi';
/*
获取所有的todolist 
 */
export const getTodos = async () => {
  return request('/api/todos');
};

/* 添加todo */
export const addTodo = async (data) => {
  const url = '/api/addTodo';

  const options = {
    data,
    method: 'POST',
  };
  return request(url, options);
};

/* 修改todo */
export const setStatus = async (data) => {
  const url = '/api/setStatus';

  //  修改用put方法
  const options = {
    data,
    method: 'PUT',
  };
  return request(url, options);
};
