/*
 * @Author: Blush0124 848415857@qq.com
 * @Date: 2022-05-05 15:51:18
 * @LastEditors: Blush0124 848415857@qq.com
 * @LastEditTime: 2022-05-05 17:06:35
 * @FilePath: \cydt-chz\src\services\dashboard.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { request } from 'umi';

export const fecthDashboard = async () => {
  return request('/api/dashboard');
};
