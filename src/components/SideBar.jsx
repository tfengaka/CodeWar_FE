import Logo from 'assets/images/IT_Derpart_Logo.png';
import React from 'react';
import DropdownCollapse from './DropdownCollapse';

const sideBarOptions = [
  {
    title: 'Bài tập',
    children: [
      {
        name: 'Danh sách bài tập',
        path: '/admin/problems',
      },
      {
        name: 'Thêm mới bài tập',
        path: '/admin/problems/create',
      },
    ],
  },
  {
    title: 'Cuộc thi',
    children: [
      {
        name: 'Danh sách cuộc thi',
        path: '/admin/contest',
      },
      {
        name: 'Tạo mới cuộc thi',
        path: '/admin/contest/create',
      },
    ],
  },
];

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo_wrapper">
          <img src={Logo} alt="logo" />
        </div>
      </div>
      <div className="option">
        {sideBarOptions.map((option, index) => (
          <DropdownCollapse key={index} {...option} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
