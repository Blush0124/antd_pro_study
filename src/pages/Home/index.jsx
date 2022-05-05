/*
 * @Author: Blush0124 848415857@qq.com
 * @Date: 2022-04-28 09:05:41
 * @LastEditors: Blush0124 848415857@qq.com
 * @LastEditTime: 2022-05-05 17:10:08
 * @FilePath: \cydt-chz\src\pages\Home\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { fecthDashboard } from '../../services/dashboard';

const Home = () => {
  const [dashboard, setDashboard] = useState({});
  useEffect(async () => {
    const dashboard = await fecthDashboard();
    if (dashboard) {
      setDashboard(dashboard);
    }
  }, []);
  return (
    <div className="site-statistic-demo-card">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="用户数"
              value={dashboard.usersNum}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="商品数"
              value={dashboard.goodsNum}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="订单数"
              value={dashboard.ordersNum}
              precision={0}
              valueStyle={{ color: 'blue' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
