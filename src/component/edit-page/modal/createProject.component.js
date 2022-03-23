import { Form, Input, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';

export const CreateProjectModal = (props) => {
  const { isShow, onCancel, onCreate } = props;
  const [form] = useForm();
  const onSubmit = () => {
    form.validateFields().then((data) => {
      onCreate(data?.name);
    });
  };
  return (
    <Modal
      visible={isShow}
      title="Create a new project"
      okText="Create"
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
          label="Project name"
          name="name"
          rules={[
            {
              required: true,
              message: 'You have to enter project name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
