import { Form, Select, Modal, Upload, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Option } = Select;

export const UploadProjectModal = (props) => {
  const { isShow, onCancel, onUpload, data } = props;
  const [form] = useForm();
  const [fileList, setFileList] = useState([]);
  const folderData = [
    {
      name: 'models',
      value: 0,
    },
    {
      name: 'includes',
      value: 1,
    },
  ];
  const onSubmit = () => {
    form.validateFields().then((data) => {
      onUpload(data);
    });
  };

  const uploadFile = (info) => {
    let fileList = [...info.fileList];
    const list = fileList.filter(
      (item) => item.type === 'application/x-zip-compressed',
    );
    setFileList(list);
  };

  const customUpload = (options) => {
    const { file, onSuccess } = options;
    onSuccess('Ok');
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
          <Select>
            {data.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {/* <Form.Item
          label="Folder"
          name="folder"
          initialValue={folderData[0].value}
        >
          <Select>
            {folderData.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item> */}
        <Form.Item label="Upload file" name="file">
          <Upload
            multiple={false}
            maxCount={1}
            onChange={uploadFile}
            accept=".zip"
            fileList={fileList}
            customRequest={customUpload}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};
