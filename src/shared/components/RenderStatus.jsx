import React from 'react';

const RenderStatus = ({ status, type }) => {
  const types = [
    {
      type: 'primary',
      status: 'Received',
    },
    {
      type: 'success',
      status: 'Complete',
    },
    {
      type: 'putaway',
      status: 'Putaway',
    },
  ];

  const typeFilter = types.filter((item) => item.status === status);

  return <span className={`label label-${typeFilter[0].type}`}>{status}</span>;
};

export default RenderStatus;
