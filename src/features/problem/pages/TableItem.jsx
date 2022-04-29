import React from 'react';

const TableItem = (props) => {
  return (
    <div className='table_item'>
      <div>{props.data.id}</div>
      <div className='table_item-desc'>{props.data.name}</div>
      <div>{props.data.level}</div>
    </div>
  );
};

export default TableItem;
