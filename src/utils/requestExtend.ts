/*
 * @Author: Blush0124 848415857@qq.com
 * @Date: 2022-04-29 10:55:09
 * @LastEditors: Blush0124 848415857@qq.com
 * @LastEditTime: 2022-05-05 11:08:58
 * @FilePath: \cydt-chz\src\utils\requestExtend.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: your name
 * @Date: 2022-04-29 10:55:09
 * @LastEditTime: 2022-05-05 11:05:42
 * @LastEditors: Blush0124 848415857@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cydt-chz\src\utils\requestExtend.ts
 */
/*
 * @Description:
 * @Author: tangq(tangq@geoscene.com.cn)
 * @Date: 2022-04-25 14:15:17
 * @LastEdited: tangq(tangq@geoscene.com.cn)
 */
import { extend } from 'umi-request';

function requestExtend<T>(url: any, options: any): Promise<T> {
  /**
   * 约定配置
   */
  // 请求前缀
  let prefix = '';
  const token = sessionStorage.getItem('token');
  let config: any = sessionStorage.getItem('appConfig');
  if (config) {
    config = JSON.parse(config);
    prefix = process.env.NODE_ENV === 'development' ? config.apiBaseURL_dev : config.apiBaseURL;
  }

  const requestTemp: any = extend({
    prefix: prefix,
    // 需要认证的api 添加请求头
    // timeout: 5000,
    headers: {
      Authorization: token || '',
    },
  });

  // return requestTemp<T>(url, options);
  return requestTemp(url, options);
}

export default requestExtend;
