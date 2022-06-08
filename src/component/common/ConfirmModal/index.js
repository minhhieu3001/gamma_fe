import { Modal } from 'antd';
import React from 'react';

export const ConfirmModal = (props) => {
  const { onCancel, onSubmit, title, text, visible } = props;
  return (
    <Modal
      visible={visible}
      title={title}
      okText="Ok"
      onCancel={onCancel}
      onOk={onSubmit}
    >
      {text}
    </Modal>
  );
};
