import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Dropdown, Layout } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { HeaderComp } from '../common/header.component';

export const Simulation = () => {
  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <HeaderComp></HeaderComp>
        <Content style={{ padding: '0 0px' }}>
          <Layout
            className="site-layout-background"
            style={{ height: '90vh' }}
          ></Layout>
        </Content>
      </Layout>
    </>
  );
};
