import { Avatar, Form, Input, Select } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';

export default function AccountComponent() {
  return (
    <div
      style={{
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          margin: 'auto',
          width: '90px',
          height: '90px',
          marginBottom: 40,
        }}
      >
        <Avatar size={90} icon={<UserOutlined />} />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div>
          <p
            style={{
              backgroundColor: '#018ABE',
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 30,
              paddingRight: 30,
              color: 'white',
              fontSize: 20,
            }}
          >
            Email
          </p>
          <p
            style={{
              backgroundColor: '#018ABE',
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 30,
              paddingRight: 30,
              color: 'white',
              fontSize: 20,
            }}
          >
            Birthday
          </p>
          <p
            style={{
              backgroundColor: '#018ABE',
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 30,
              paddingRight: 30,
              color: 'white',
              fontSize: 20,
            }}
          >
            Full Name
          </p>
          <p
            style={{
              backgroundColor: '#018ABE',
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 30,
              paddingRight: 30,
              color: 'white',
              fontSize: 20,
            }}
          >
            Gender
          </p>
          <p
            style={{
              backgroundColor: '#018ABE',
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 30,
              paddingRight: 30,
              color: 'white',
              fontSize: 20,
            }}
          >
            Phone
          </p>
        </div>
        <div style={{ marginLeft: 100 }}>
          <p style={{ fontSize: 20, alignSelf: 'center' }}>email@gmail.com</p>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 40 }}
            layout="horizontal"
            size="large"
            style={{ maxWidth: 600, marginTop: 45 }}
          >
            <Form.Item>
              <Input placeholder="xx/xx/xxxx" />
            </Form.Item>
            <Form.Item style={{ marginTop: 30 }}>
              <Input placeholder="Nguyen van a" />
            </Form.Item>
            <Form.Item style={{ marginTop: 30 }}>
              <Select>
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item style={{ marginTop: 30 }}>
              <Input placeholder="áoifhoaisfh" />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
