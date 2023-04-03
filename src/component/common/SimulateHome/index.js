import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function SimulateHome({ setChoose }) {
  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: 40, marginBottom: 50 }}>
        MÔT SỐ LƯU Ý
      </h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <img
          src="https://images.thdstatic.com/productImages/a810e8c9-9c40-44f9-a01c-eeaa5ac9c88d/svn/stencil-ease-commercial-stencils-cc0081m-64_600.jpg"
          style={{ width: 400, height: 300, alignSelf: 'center' }}
        />
        <video controls width={800}>
          <source
            src={
              'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
            }
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div style={{ width: 300, height: 100, margin: 'auto' }}>
        <Button
          onClick={() => setChoose(3)}
          style={{
            backgroundColor: '#018ABE',
            width: 300,
            height: 100,
            marginTop: 50,
            alignSelf: 'center',
            fontSize: 30,
            color: 'white',
            borderRadius: 20,
          }}
        >
          SIMULATE NOW
        </Button>
      </div>
    </div>
  );
}
