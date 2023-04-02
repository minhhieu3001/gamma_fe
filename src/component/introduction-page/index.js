import React, { useState, useEffect } from 'react';
import './style.scss';
import { Button } from 'antd';

export default function Introduction() {
  return (
    <div className="root">
      <div className="top">
        <p className="test">HANOI UNIVERSITY OF ENGINEERING AND TECHNOLOGY</p>
        <Button
          style={{
            backgroundColor: '#161317',
            width: '120px',
            height: '60px',
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            padding: '10px',
          }}
          type="link"
          href="https://uet.vnu.edu.vn/"
        >
          <span
            style={{
              padding: 12,
              width: '100%',
            }}
          >
            Find Us
          </span>
        </Button>
      </div>
      <div className="content">
        <img
          src="https://imageio.forbes.com/specials-images/imageserve/61d52d4e3a76ed81ac034ea8/0x0.jpg?format=jpg"
          className="image"
        />
        <div className="overlay">
          <h2 id="name">
            CLOUD APPLICATION SHOWING MULTI-AGENT SIMULATE USING GAMA PLATFORM
          </h2>
          <Button
            style={{
              backgroundColor: '#161317',
              width: '150',
              height: '60px',
              color: 'white',
              fontSize: '24px',
              fontWeight: '600',
              padding: '10px',
              minHeight: '60px',
            }}
            type="link"
            href="/login"
          >
            <span
              style={{
                width: '100%',
                paddingTop: 12,
              }}
            >
              Learn More
            </span>
          </Button>
        </div>
      </div>
      <div className="introWeb">
        <h1 id="nameWeb">WEBSITE FOR SIMULATING</h1>
        <h2 id="webContent">
          Sản phẩm từ dự án mô phỏng đa tác tử được phát triển bởi Mr Trường and
          Dr Phạm Linh từ những năm 2020 trải qua 3 năm nghiên cứu và phát triển
          đã cho ra thành quả như giờ.
        </h2>
        <img
          src="https://uet.vnu.edu.vn/wp-content/uploads/2023/03/hb-lazada1.jpg"
          className="image"
        />
      </div>
    </div>
  );
}
