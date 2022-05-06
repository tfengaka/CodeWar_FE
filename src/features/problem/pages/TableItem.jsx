import React from 'react';
import { Link } from 'react-router-dom';

const TableItem = (props) => {
  return (
    <Link to={`/problem/${props.data.id}`} state={{ data: props.data }}>
      <div className='table_item'>
        <div>{props.data.id}</div>
        <div className='table_item-desc'>{props.data.name}</div>
        <div>{props.data.level}</div>
      </div>
    </Link>
  );
};

export default TableItem;
