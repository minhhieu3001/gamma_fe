import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  EditOutlined,
  WechatOutlined,
  BarChartOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import './style.scss';
import { useHistory } from 'react-router-dom';
import SimulateHome from '../common/SimulateHome';
import HeaderComponent from '../common/header.component';
import HomeContent from './home.content';
import ChartComponent from './chart.component';
import AccountComponent from './account.component';
import { getItem } from '../../utils';

const { Header, Sider, Content } = Layout;

const Home = () => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const [choose, setChoose] = useState(1);

  useEffect(() => {
    localStorage.removeItem('tabs');
    const tempUser = getItem('user');
    if (!tempUser) history.push('/login');
  });

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: '100%' }}
      >
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
              label: 'Simulate',
              onClick: () => setChoose(2),
            },
            {
              key: '3',
              icon: <WechatOutlined />,
              label: 'Chat',
              onClick: () => {
                setChoose(3);
                history.push('/chat');
              },
            },
            {
              key: '4',
              icon: <BarChartOutlined />,
              label: 'Chart',
              onClick: () => setChoose(4),
            },
            {
              key: '5',
              icon: <UserOutlined />,
              label: 'Member',
              onClick: () => setChoose(5),
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            paddingLeft: 20,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,

            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
              style: { fontSize: 30, alignSelf: 'center' },
            },
          )}
          <LogoutOutlined
            style={{ fontSize: 30, alignSelf: 'center' }}
            onClick={() => {
              localStorage.clear();
              history.push('/login');
            }}
          />
        </Header>
        <Content
          style={{
            height: '100%',
            padding: 20,
            overflow: 'scroll',
            backgroundColor: 'white',
          }}
        >
          {choose === 1 ? (
            <HomeContent />
          ) : choose === 2 ? (
            <SimulateHome />
          ) : choose === 3 ? (
            <></>
          ) : choose === 4 ? (
            <ChartComponent />
          ) : (
            <AccountComponent />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;
