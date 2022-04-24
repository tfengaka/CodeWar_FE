import React from 'react';
import Card from './category/Card';
const fakeData = [
  {
    id: 1,
    title: 'Luyện tập về thuật toán nhị phân bla bla bla',
    name: 'Trần Thị Dung',
    position: 'Giáo viên',
  },
  {
    id: 2,
    title:
      'thuat toan sap sap nhi phan nhi phannhi phannhi phannhi phan  thuat toan sap sap nhi phan nhi phannhi phannhi phannhi phan',
    name: 'Phạm Thị Miên',
    position: 'Giáo viên',
  },
  {
    id: 3,
    title: 'thuat toan sap sap chen ',
    name: 'Nguyễn Lê Minh',
    position: 'Giáo viên',
  },
  {
    id: 4,
    title: 'thuat toan sap sap chon',
    name: 'Trần Phong Nhã',
    position: 'Giáo viên',
  },
];
const Problem = () => {
  return (
    <div className='cards'>
      {fakeData.map((item) => (
        <Card key={item.id} data={item} />
      ))}
    </div>
  );
};

export default Problem;
