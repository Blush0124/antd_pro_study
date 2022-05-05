/*
 * @Author: your name
 * @Date: 2022-04-28 14:36:41
 * @LastEditTime: 2022-04-29 14:21:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cydt-chz\mock\todo.js
 */
let list = [
  {
    id: 1,
    title: '吃饭',
    status: 0,
  },
  {
    id: 2,
    title: '睡觉',
    status: 1,
  },
  {
    id: 3,
    title: '打豆豆',
    status: 2,
  },
  {
    id: 4,
    title: '上班',
    status: 1,
  },
  {
    id: 5,
    title: '打游戏',
    status: 2,
  },
  {
    id: 6,
    title: '吃饭饭',
    status: 0,
  },
];
export default {
  // get 获取数据
  'GET /api/todos': list,

  // post 添加数据
  'POST /api/addTodo': (req, res) => {
    // 传过来的数据存在req.body里,需要为对象
    const item = {
      id: list.length + 1,
      title: req.body.todo,
      status: 0,
    };
    list.unshift(item);
    // res.send 返回值
    res.send({
      code: 0,
      message: '添加成功！',
    });
  },

  // 修改数据
  'PUT /api/setStatus': (req, res) => {
    const { id, status } = req.body;
    list.map((item, index) => {
      if (item.id === id) {
        // map不会修改原数组，所以需要在原数组上修改
        list[index].status = status;
      }
    });
    res.send({
      code: 0,
      message: '修改成功！',
    });
  },
};
