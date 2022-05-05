/*
 * @Author: Blush0124 848415857@qq.com
 * @Date: 2022-05-05 13:58:55
 * @LastEditors: Blush0124 848415857@qq.com
 * @LastEditTime: 2022-05-05 14:10:46
 * @FilePath: \cydt-chz\src\models\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { login } from '@/services/ant-design-pro/api';

export default {
  namespace: 'login',
  state: {
    response: null,
  },
  effeccts: {
    *fetchLogin({ payload }, { call, put }) {
      const response = yield call(login, payload);

      yield put({
        type: 'setLogin',
        payload: response,
      });
    },
  },
  reducers: {
    setLogin(_, { payload }) {
      return {
        ...state,
        response: payload,
      };
    },
  },
};
