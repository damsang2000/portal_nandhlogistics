import React, { useState } from 'react';

const usePagination = () => {
  // ! state pagination
  const [Total, setTotal] = useState(0);
  const [page, setpage] = useState(1);
  const [PageSize, setPageSize] = useState(50);
  const pageOption = ['50', '100'];
  const position = ['bottomCenter'];
  // ! handle pagination
  const getData = (current, pageSize) => {
    setpage(current);
  };
  const getDataSize = (current, size) => {
    setPageSize(size);
  };

  return [
    Total,
    setTotal,
    page,
    PageSize,
    getData,
    getDataSize,
    pageOption,
    position,
    setpage,
  ];
};

export default usePagination;
