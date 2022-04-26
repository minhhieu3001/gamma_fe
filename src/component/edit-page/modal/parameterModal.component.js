import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Modal, Descriptions, Input, Space, Button, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect } from 'react';

const paramTypes = ['INT', 'FLOAT', 'BOOLEAN', 'STRING'];
const { Option } = Select;

export const ParameterModal = (props) => {
  const { isShow, onCancel, onSimulate, form, content } = props;
  useEffect(() => {
    form.resetFields();
    if (content.length > 0) {
      const parameterList = [];
      const outputList = [];
      content.split('\n').map((item) => {
        const line = item.replace('\t', '').trim();
        if (line.indexOf('parameter') === 0) {
          const texts = line?.split(' ') || [];
          const index = texts?.indexOf('var:');
          if (index && index < texts.length - 1) {
            parameterList.push({ name: texts[index + 1] });
          }
        } else if (line.indexOf('display') === 0) {
          const texts = line?.split(' ');
          if (texts?.length > 1) {
            outputList.push({ name: texts[1] });
          }
        }
      });
      form.setFieldsValue({ parameterList, outputList });
    }
    return () => console.log('close');
  }, [content]);
  const onSubmit = () => {
    form.validateFields().then((data) => {
      onSimulate(data);
    });
  };
  return (
    <Modal
      visible={isShow}
      title="Input parameters"
      okText="Submit"
      style={{ top: 20 }}
      onCancel={onCancel}
      onOk={onSubmit}
    >
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        labelAlign="left"
      >
        <Descriptions title="Simulation" />
        <Form.Item
          label="Number of simulation"
          name="finalStep"
          rules={[
            {
              required: true,
              message: 'Number of simulation is required!',
            },
            {
              pattern: /^(?:\d*)$/,
              message: 'Must be greater than -1',
            },
          ]}
        >
          <Input type="number" placeholder="Enter number" />
        </Form.Item>
        <Form.Item label="Stop condition" name="until">
          <Input placeholder="Enter value" />
        </Form.Item>
        <Form.Item
          label="Experiment name"
          name="experiment"
          rules={[
            {
              required: true,
              message: 'Experiment name is required!',
            },
          ]}
        >
          <Input placeholder="Enter experiment name" />
        </Form.Item>
        <Descriptions title="Parameters" />
        <div
          className="param-section"
          style={{ height: '20vh', overflowY: 'auto' }}
        >
          <Form.List name="parameterList">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Space key={key} style={{ display: 'flex' }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      rules={[
                        { required: true, message: 'Missing parameter name' },
                      ]}
                    >
                      <Input placeholder="Name" style={{ width: '120px' }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'type']}
                      rules={[
                        { required: true, message: 'Missing parameter type' },
                      ]}
                    >
                      <Select placeholder="Type" style={{ width: '120px' }}>
                        {paramTypes.map((item) => (
                          <Option value={item}>{item}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing parameter value',
                        },
                      ]}
                      style={{ width: '120px' }}
                    >
                      <Input placeholder="Value" style={{ width: '120px' }} />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.ErrorList errors={errors} />
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
        <Descriptions title="Outputs" />
        <div
          className="output-section"
          style={{ height: '20vh', overflowY: 'auto' }}
        >
          <Form.List
            name="outputList"
            rules={[
              {
                required: true,
                message: 'Missing outputs',
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <>
                    <Space
                      key={key}
                      style={{ display: 'flex' }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        rules={[
                          { required: true, message: 'Missing output name' },
                        ]}
                        style={{ width: '120px' }}
                      >
                        <Input placeholder="Name" style={{ width: '120px' }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'framerate']}
                        type="number"
                        rules={[
                          {
                            required: true,
                            message: 'Missing parameter framerate',
                          },
                          {
                            pattern: /^(?:\d*)$/,
                            message: 'Must be greater than -1',
                          },
                        ]}
                        style={{ width: '120px' }}
                      >
                        <Input
                          placeholder="Frame rate"
                          type="number"
                          min={0}
                          style={{ width: '120px' }}
                        />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  </>
                ))}
                <Form.ErrorList errors={errors} />
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
      </Form>
    </Modal>
  );
};
