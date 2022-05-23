import React from 'react';
import { useLocation } from 'react-router-dom';

const Competition = () => {
  const location = useLocation();
  let { data } = location.state;
  console.log(data);
  return <div>Competition</div>;
};

export default Competition;
