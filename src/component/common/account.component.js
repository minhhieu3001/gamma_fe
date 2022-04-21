import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Select, Modal, Input, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { getUser } from '../../service/api';
import { getItem, setItem } from '../../utils';

export const AccountModal = (props) => {
  const { isShow, onCancel, onUpdate } = props;
  const [isLoading, setLoading] = useState(true);
  const [ava, setAva] = useState(null);
  const [form] = useForm();
  const onSubmit = () => {
    form.validateFields().then((data) => {
      onUpdate(data);
    });
  };
  useEffect(() => {
    setLoading(true);
    const user = getItem('user');
    if (!user) setLoading(false);
    getUser(user.id)
      .then((res) => {
        const data = res.data;
        setLoading(false);
        form.setFieldsValue(data);
        setItem('user', data);
      })
      .catch((err) => setLoading(false));
  }, [isShow]);
  return (
    <Modal
      visible={isShow}
      title="Account"
      style={{ top: '100' }}
      okText="Edit"
      onCancel={onCancel}
      onOk={onSubmit}
    >
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spin spinning={isLoading} />
        </div>
      ) : (
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{}}
          form={form}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <div
              className="img-container"
              style={{
                borderRadius: '100%',
                overflow: 'hidden',
                backgroundColor: '#ccc',
                width: 100,
                height: 100,
              }}
            >
              <div className="hover-pop">
                <UploadOutlined style={{ fontSize: 30 }} />
              </div>
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  top: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                }}
              >
                <UserOutlined style={{ fontSize: 50, color: '#fff' }} />
              </div>
              {ava && <img width={100} height={100} src={``}></img>}
            </div>
          </div>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              {
                pattern: /\S+@\S+\.\S+/,
                message: 'Not email format!',
              },
            ]}
          >
            <Input placeholder="Input email..." />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Input name..." />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
