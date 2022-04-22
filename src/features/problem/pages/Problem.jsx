import React from 'react';

import { useQuery } from '@apollo/client';
import { getExercises } from 'graphql/Queries';

const fakeData = [
  {
    id: 1,
    title: 'Luyện tập về thuật toán nhị phân bla bla bla',
    level: 'Dễ',
  },
  {
    id: 2,
    title: 'thuat toan sap sap nhi phan nhi phannhi  ',
    level: 'Dễ',
  },
  {
    id: 3,
    title: 'thuat toan sap sap chen ',
    level: 'Dễ',
  },
];
const Problem = () => {
  const { id, name, level } = useQuery(getExercises);

  return (
    <div className='table'>
      <div className='table_header'>
        <div className='table_header-left'>Danh dách bài tập </div>
        <div className='table_header-right'>Độ khó</div>
      </div>

      <div className='table_title'>
        <div>ID</div>
        <div className='table_title-desc'>Tiêu đề</div>
        <div>Mức</div>
      </div>

      {fakeData.map((item) => (
        <div className='table_item'>
          <div>{item.id}</div>
          <div className='table_item-desc'>{item.title}</div>
          <div>{item.level}</div>
        </div>
      ))}
    </div>
  );
};

export default Problem;
