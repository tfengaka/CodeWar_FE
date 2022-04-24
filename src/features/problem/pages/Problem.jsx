import React from 'react';

import { useQuery } from '@apollo/client';
import { getExercises } from 'graphql/Queries';
import TableItem from './TableItem';

const Problem = () => {
  const { loading, error, data } = useQuery(getExercises);

  console.log(data);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

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

      {data?.exercises?.map((item) => (
        <TableItem key={item.id} data={item} />
      ))}
    </div>
  );
};

export default Problem;
