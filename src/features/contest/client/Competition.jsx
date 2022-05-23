import Button from 'components/Button';
import React from 'react';
import { useLocation } from 'react-router-dom';
import ProblemSolve from '../../../components/ProblemSolve';

const Competition = () => {
  const location = useLocation();
  let { data } = location.state;
  return (
    <div>
      <div>
        {data.map((item, index) => (
          <Button>{index + 1}</Button>
        ))}
      </div>
      <div>
        <ProblemSolve />
      </div>
      <div>bottom</div>
    </div>
  );
};

export default Competition;
