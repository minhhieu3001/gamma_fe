import {
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Col, Dropdown, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';

export const HeaderComp = (props) => {
  const menu = (
    <Menu>
      <Menu.Item key="0" icon={<UserOutlined />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Account
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" icon={<LogoutOutlined />}>
        Log out
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className="header" style={{ padding: 0, display: 'flex' }}>
      <Col span={2}>
        <img
          src="https://gama-platform.org//resources/images/general/GamaPlatform.png"
          alt="gamma-icon"
          width={50}
          height={50}
          style={{ marginLeft: 20 }}
        />
      </Col>

      <Col span={10}>
        <h1 style={{ color: '#fff' }}>GAMMA</h1>
      </Col>

      <Col span={12}>
        <Dropdown overlay={menu}>
          <Avatar
            size={35}
            style={{ position: 'absolute', right: 70, top: 15 }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </Col>
    </Header>
  );
};
