import {
  CameraOutlined,
  LockOutlined,
  LogoutOutlined,
  UploadOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Col,
  Dropdown,
  Form,
  Image,
  Input,
  Menu,
  Modal,
  Space,
} from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateUser } from '../../service/api';
import { getItem } from '../../utils';
import addNotification, { NOTIFICATION_TYPE } from '../notification';
import { AccountModal } from './account.component';
import { ResetModal } from './reset.component';
import './style.scss';

const HeaderComp = (props) => {
  const { isLoading, setLoading } = props;
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push('/');
  };
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
  });

  const onUpdate = (data) => {
    setLoading(true);
    setModal({ isOpen: false, type: null });
    const user = getItem('user');
    if (!user) setLoading(false);
    else
      updateUser(user.id, data)
        .then((res) => {
          const data = res.data.data;
          addNotification('Update successfully!', NOTIFICATION_TYPE.SUCCESS);
        })
        .catch((err) => {
          addNotification('Update failed!', NOTIFICATION_TYPE.ERROR);
        })
        .finally(() => setLoading(false));
  };
  const menu = (
    <Menu>
      <Menu.Item key="0" icon={<UserOutlined />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setModal({ isOpen: true, type: 'account' })}
        >
          Account
        </a>
      </Menu.Item>
      <Menu.Item key="1" icon={<LockOutlined />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setModal({ isOpen: true, type: 'reset' })}
        >
          Reset password
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={logout}>
        Log out
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      {modal.isOpen && modal.type === 'account' && (
        <AccountModal
          onCancel={() => setModal({ isOpen: false, type: null })}
          isShow={modal.isOpen}
          onUpdate={onUpdate}
        />
      )}
      {modal.isOpen && modal.type === 'reset' && (
        <ResetModal
          onCancel={() => setModal({ isOpen: false, type: null })}
          isShow={modal.isOpen}
          onUpdate={onUpdate}
        />
      )}
      <Header className="header" style={{ padding: 0, display: 'flex' }}>
        <Col span={2}>
          <a href="/edit">
            <img
              src="https://uet.vnu.edu.vn/wp-content/uploads/2017/02/logo2_new.png"
              alt="gamma-icon"
              width={50}
              height={50}
              style={{ marginLeft: 30 }}
            />
          </a>
        </Col>

        <Col span={10}>
          <a href="/edit">
            <h1 style={{ color: '#fff' }}>ASF HN</h1>
          </a>
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
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (value) => dispatch({ type: 'SPIN_LOADING', value }),
  };
};
const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComp);
