import './style.scss';
import { Form, Input, Button, Checkbox, Divider, Space } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export const LogIn = () => {
  const history = useHistory();
  const onFinish = (values) => {
    history.push('/edit');
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
                  src="https://gama-platform.org//resources/images/general/GamaPlatform.png"
                  alt="gamma-icon"
                  width={50}
                  height={50}
                />
              </div>
            </Form.Item>
            <Divider style={{ marginBottom: 30 }} />
            <Space direction="vertical">
              <Form.Item
                name="username"
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Enter username..."
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
