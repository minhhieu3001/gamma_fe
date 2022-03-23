import { Form, Select, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';

const { Option } = Select;

export const DeleteProjectModal = (props) => {
  const { isShow, onCancel, onDelete, data } = props;
  const [form] = useForm();
  const onSubmit = () => {
    form.validateFields().then((data) => {
      onDelete(data?.projectId);
    });
  };
  return (
    <Modal
      visible={isShow}
      title="Delete project"
      okText="Delete"
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
          <Select style={{ width: 120 }}>
            {data.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
