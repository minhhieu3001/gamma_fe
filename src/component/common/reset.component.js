import { Form, Select, Modal, Input, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import addNotification, { NOTIFICATION_TYPE } from '../notification';

export const ResetModal = (props) => {
  const { isShow, onCancel, onUpdate } = props;
  const [ava, setAva] = useState(null);
  const [form] = useForm();
  const onSubmit = () => {
    form.validateFields().then((data) => {
      const { password, confirmPassword } = data;
      if (!isEqual(password, confirmPassword))
        addNotification(
          'Confirm password does not match!',
          NOTIFICATION_TYPE.ERROR,
        );
      else onUpdate(data);
    });
  };
  return (
    <Modal
      visible={isShow}
      title="Reset password"
      style={{ top: '100' }}
      okText="Update"
      onCancel={onCancel}
      onOk={onSubmit}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{}}
        form={form}
      >
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input placeholder="Input password..." type="password" />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name="confirmPassword"
          rules={[
            { required: true, message: 'Please input confirm password!' },
          ]}
        >
          <Input placeholder="Input confirm password..." type="password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
