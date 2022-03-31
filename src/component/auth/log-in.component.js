import './style.scss';
import { Form, Input, Button, Checkbox, Divider, Space } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { login } from '../../service/api';
import addNotification, { NOTIFICATION_TYPE } from '../notification';
import { setItem } from '../../utils';

export const LogIn = () => {
  const history = useHistory();
  const onFinish = (values) => {
    login(values)
      .then((res) => {
        const data = res.data;
        localStorage.setItem('token', data.token);
        setItem('user', data.user);
        history.push('/edit');
      })
      .catch(function (err) {
        if (err.response)
          addNotification(err.response.data.message, NOTIFICATION_TYPE.ERROR);
        else addNotification(err, NOTIFICATION_TYPE.ERROR);
      });
  };
  return (
    <>
      <div className="container">
        <div className="background"></div>
        <div className="form-container">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item wrapperCol={{ span: 24 }}>
              <div className="img-contain">
                <img
                  src="https://uet.vnu.edu.vn/wp-content/uploads/2017/02/logo2_new.png"
                  alt="gamma-icon"
                  width={50}
                  height={50}
                />
              </div>
            </Form.Item>
            <Divider style={{ marginBottom: 30 }} />
            <Space direction="vertical">
              <Form.Item
                name="email"
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: 'Please input your email!' },
                  {
                    pattern: /\S+@\S+\.\S+/,
                    message: 'Not email format!',
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Enter email..."
                />
              </Form.Item>

              <Form.Item
                name="password"
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password
                  placeholder="Enter password..."
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  prefix={<LockOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  style={{ width: '100%' }}
                  type="submit"
                  htmlType="submit"
                >
                  Log In
                </Button>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                Not have account yet?
                <Button type="link" href="/register">
                  Regist here
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </div>
      </div>
    </>
  );
};
