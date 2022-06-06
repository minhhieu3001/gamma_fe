import { Modal, Col } from 'antd';
import { useState } from 'react';
import { UploadInput } from '../../common/UploadInput';
import addNotification, { NOTIFICATION_TYPE } from '../../notification';

export const UploadProjectModal = (props) => {
  const { isShow, onCancel, onUpload } = props;
  const [file, setFile] = useState();

  const onSubmit = () => {
    if (!file) addNotification('Empty project!', NOTIFICATION_TYPE.ERROR);
    else onUpload(file);
  };

  return (
    <Modal
      visible={isShow}
      title="Upload Project"
      okText="Upload"
      onCancel={onCancel}
      onOk={onSubmit}
    >
      <Col span={12} offset={6}>
        <UploadInput
          title={'Choose Zip File'}
          style={{ width: '100%' }}
          allowExts={['zip']}
          handleSubmitFile={(file) => setFile(file)}
        />
      </Col>
    </Modal>
  );
};
