import { useState } from 'react';
import addNotification, { NOTIFICATION_TYPE } from '../../notification';
import './style.scss';
export const UploadInput = (props) => {
  const {
    title = 'Choose File',
    style = {},
    allowExts = [],
    preventExts = [],
    handleSubmitFile,
  } = props;
  const NotFoundFile = 'No file choose...';
  const [displayInputText, setDisplayInputText] = useState(NotFoundFile);
  const handleInputFile = (e) => {
    const fileName = e.target.value.split('\\').pop();
    const file = e.target.files[0];
    const fileUploadElement = document.getElementsByClassName('file-upload')[0];
    if (!file) {
      fileUploadElement.classList.remove('active');
      setDisplayInputText(NotFoundFile);
      handleSubmitFile(null);
      return;
    }
    if (allowExts[0] || preventExts[0]) {
      const ext = fileName.split('.').pop();
      if (
        (allowExts[0] && !allowExts.includes(ext)) ||
        (preventExts[0] && preventExts.includes(ext))
      ) {
        addNotification(
          'This file type is not allowed!',
          NOTIFICATION_TYPE.ERROR,
        );
        fileUploadElement.classList.remove('active');
        setDisplayInputText(NotFoundFile);
        handleSubmitFile(null);
        return;
      }
    }
    if (file) {
      fileUploadElement.classList.add('active');
      setDisplayInputText(fileName);
      handleSubmitFile(file);
    }
  };
  return (
    <>
      <div class="file-upload" style={{ ...style }}>
        <div class="file-select">
          <div class="file-select-button" id="fileName">
            {title}
          </div>
          <div class="file-select-name" id="noFile">
            {displayInputText}
          </div>
          <input
            type="file"
            name="chooseFile"
            id="chooseFile"
            onChange={handleInputFile}
          />
        </div>
      </div>
    </>
  );
};
