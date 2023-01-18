import React from 'react';

const CustomQuantity = (props) => {
  return (
    <div style={{ textAlign: 'center', ...props.style }}>{props.value}</div>
  );
};

export default CustomQuantity;
