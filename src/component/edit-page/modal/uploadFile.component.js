import { Col, Form, Input, Modal, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useState } from 'react';
import { UploadInput } from '../../common/UploadInput';
import { typeOptions } from '../../constant';

export const UploadFileModal = (props) => {
  const { isShow, onCancel, onUploadFile, data } = props;
  const [form] = useForm();
  const [file, setFile] = useState(null);
  const onSubmit = () => {
    form.validateFields().then((data) => {
      onUploadFile(data, file);
    });
  };
  return (
    <Modal
      visible={isShow}
      title="Upload file"
      okText="Upload"
      onCancel={onCancel}
      onOk={onSubmit}
    >
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 10 }}
      >
        <Form.Item
          label="Project"
          name="projectId"
          rules={[
            {
              required: true,
              message: 'You have to select project!',
            },
          ]}
        >
          <Select showSearch placeholder="Select project">
            {data.map((opt) => (
              <Select.Option value={opt.id}>{opt.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="File type"
          name="type"
          rules={[
            {
              required: true,
              message: 'You have to select file type!',
            },
          ]}
        >
          <Select showSearch placeholder="Select project">
            {typeOptions.map((opt) => (
              <Select.Option value={opt.value}>{opt.text}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Subfolder path" name="path">
          <Input placeholder="Enter subfolder path" />
        </Form.Item>
        <Col span={14} offset={1}>
          <UploadInput
            handleSubmitFile={(file) => setFile(file)}
            style={{ width: '100%' }}
            preventExts={['zip', 'rar']}
          />
        </Col>
      </Form>
    </Modal>
  );
};
