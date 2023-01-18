import React from 'react';
import { Input } from 'antd';

const SearchCustom = (props) => {
  const { Search } = Input;
  return (
    <Search
      placeholder={props.title}
      enterButton
      style={{
        width: '50%',
      }}
    />
  );
};

export default SearchCustom;
