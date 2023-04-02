import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  EditOutlined,
  WechatOutlined,
  BarChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Edit from '../edit-page/edit.component';
import './style.scss';
import { useHistory } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const Home = () => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const [choose, setChoose] = useState(1);

  useEffect(() => {
    console.log(choose);
  });

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Home',
              onClick: () => setChoose(1),
            },
            {
              key: '2',
              icon: <EditOutlined />,
              label: 'Edit',
              onClick: () => {
                history.push('/edit');
              },
            },
            {
              key: '3',
              icon: <WechatOutlined />,
              label: 'Chat',
              onClick: () => setChoose(3),
            },
            {
              key: '4',
              icon: <BarChartOutlined />,
              label: 'Chart',
            },
            {
              key: '5',
              icon: <UserOutlined />,
              label: 'Member',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            paddingLeft: 20,
            backgroundColor: 'white',
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            },
          )}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        ></Content>
      </Layout>
    </Layout>
  );
};
export default Home;
