import React from 'react';
import {
  TwitterOutlined,
  FacebookFilled,
  InstagramFilled,
} from '@ant-design/icons';

export default function HomeContent() {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ width: '50%', marginTop: 100 }}>
          <h1 style={{ fontSize: 34, fontWeight: 600 }}>ĐẶT VẤN ĐỀ</h1>
          <p style={{ fontSize: 20, color: 'black' }}>
            Mô phỏng đa tác tử ngày nay, hệ thống đa tác tử hay còn gọi là mô
            phỏng đa tác tử (Multi-Agent Based System) [Drogoul & Gaudou, 2012]
            được sử dụng rộng rãi trong nhiều lĩnh vực khác nhau và nó dần thay
            thế cho các kỹ thuật mô phỏng vi mô, mô phỏng dựa trên hướng đối
            tượng hay dựa trên từng cá thể đã sử dụng trước đây. GIúp chúng ta
            có cái nhìn trực quan hóa hơn về từng cá thể và có thể sử dụng một
            cách dễ dàng với tất cả người dùng
          </p>
        </div>
        <img
          src="https://dim.mcusercontent.com/cs/3dde047e26aba42bc27abe601/images/5d2cf9de-b14a-f585-6e21-acdfe0b0be7b.png?rect=8%2C0%2C242%2C256&w=608&dpr=1"
          style={{ width: 400, height: 400 }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: 100,
        }}
      >
        <img src="https://dim.mcusercontent.com/cs/3dde047e26aba42bc27abe601/images/29129a01-132f-e419-da30-a8be6554c2bf.png?w=608&dpr=1" />
        <div style={{ marginRight: 200, marginTop: 50 }}>
          <h1 style={{ fontSize: 40, fontWeight: 600 }}>CÔNG NGHỆ SỬ DỤNG</h1>
          <ul>
            <li style={{ fontSize: 30, color: 'black', marginLeft: 50 }}>
              AWS, S3
            </li>
            <li style={{ fontSize: 30, color: 'black', marginLeft: 50 }}>
              REACT JS
            </li>
            <li style={{ fontSize: 30, color: 'black', marginLeft: 50 }}>
              MY SQL WORKBENCH
            </li>
            <li style={{ fontSize: 30, color: 'black', marginLeft: 50 }}>
              LARAVEL
            </li>
            <li style={{ fontSize: 30, color: 'black', marginLeft: 50 }}>
              GAMA PLATFORM
            </li>
          </ul>
        </div>
      </div>
      <div style={{ marginTop: 100 }}>
        <h1
          style={{
            fontSize: 40,
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          DATA
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="https://dim.mcusercontent.com/cs/3dde047e26aba42bc27abe601/images/400906a6-cbc3-5a8f-312c-647ab0a585cc.png?w=397&dpr=1" />
          <img src="https://dim.mcusercontent.com/cs/3dde047e26aba42bc27abe601/images/f6a33d8b-2fbb-925e-ed84-4223d41b8e45.png?w=397&dpr=1" />
          <img src="https://dim.mcusercontent.com/cs/3dde047e26aba42bc27abe601/images/59ad6448-bbeb-e72e-5be6-a35f1c84e6ea.png?w=397&dpr=1" />
        </div>
        <ul
          style={{
            marginTop: 20,
            marginLeft: '20%',
            alignContent: 'center',
            width: '60%',
          }}
        >
          <li style={{ fontSize: 20 }}>
            Dữ liệu được trích xuất từ 1 file tổng hợp 1 đàn lợn ở trang trại Le
            Magneraud (Charente-Maritime, Pháp)
          </li>
        </ul>
      </div>
      <div style={{ margin: 100 }}>
        <p style={{ fontSize: 26, fontWeight: 500 }}>CONTACT FOR WORK</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: 200,
          }}
        >
          <TwitterOutlined
            style={{ fontSize: 30 }}
            onClick={() => window.open('https://google.com', '_blank')}
          />
          <FacebookFilled
            style={{ fontSize: 30 }}
            onClick={() =>
              window.open('https://www.facebook.com/dunzzzz', '_blank')
            }
          />
          <InstagramFilled
            style={{ fontSize: 30 }}
            onClick={() =>
              window.open('https://www.instagram.com/d.not_gud/', '_blank')
            }
          />
        </div>
      </div>
      <div style={{ margin: 80 }}>
        <a style={{ fontSize: 26 }}>
          HANOI UNIVERSITY OF ENGINEERING AND TECHNOLOGY
        </a>
        <p>A PRODUCTION BY DAI DUONG DO</p>
      </div>
    </div>
  );
}
