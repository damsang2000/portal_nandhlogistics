import React, { useState } from 'react';
import { Input } from 'antd';
const InputColumns = ({ fHandle, title, children, setpage }) => {
  return (
    <>
      {children}
      {title}
      <Input
        className="custom-input"
        style={{ width: '100%' }}
        size="small"
        onChange={(e) => {
          fHandle(e.target.value);
          setpage(1);
        }}
      />
    </>
  );
};

export default InputColumns;
