/*
 * @Author: your name
 * @Date: 2022-04-28 14:40:02
 * @LastEditTime: 2022-04-29 14:17:18
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cydt-chz\src\models\todos.js
 */
import { getTodos } from '@/services/todo';

export default {
  namespace: 'todos',
  state: {
    todoList: [],
  },
  effects: {
    *fetchTodos(_, { call, put }) {
      const todos = yield call(getTodos);
      yield put({
        type: 'setTodos',
        payload: todos,
      });
    },
  },
  reducers: {
    setTodos(state, action) {
      return {
        ...state,
        todoList: action.payload,
      };
    },
  },
};
