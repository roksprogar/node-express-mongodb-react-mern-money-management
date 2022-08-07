import { Space, Spin } from 'antd';
import React from 'react';

function Spinner() {
  return (
    <Space size="middle" className="spinner">
      <Spin size="large" />
    </Space>
  );
}

export default Spinner;
