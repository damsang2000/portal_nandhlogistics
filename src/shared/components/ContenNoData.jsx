import { Empty } from 'antd';
import React from 'react';

const ContenNoData = (props) => {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      imageStyle={{
        height: 60,
        width: 100,
        margin: '0 auto',
      }}
      style={{ color: '#7f8c8d' }}
      description={props.desc}
    />
  );
};

export default ContenNoData;
