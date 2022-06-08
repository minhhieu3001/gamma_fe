import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import './style.scss';

export const Popup = ({ visible, x, y, handleClick }) =>
  visible && (
    <>
      <ul className="popup" style={{ left: `${x}px`, top: `${y}px` }}>
        <li onClick={handleClick}>
          <DeleteOutlined />
          &nbsp; Delete
        </li>
      </ul>
    </>
  );

export default Popup;
