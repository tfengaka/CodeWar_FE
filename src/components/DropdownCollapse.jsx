import React from 'react';
import useCollapse from 'react-collapsed';
import { Link, useLocation } from 'react-router-dom';

const DropdownCollapse = ({ title, children }) => {
  const { pathname } = useLocation();
  const isActiveCollapse = children.findIndex((e) => pathname.includes(e.path));

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ duration: 350 });
  return (
    <>
      <div className={`option_button ${isExpanded || isActiveCollapse ? 'active' : ''}`} {...getToggleProps()}>
        {title}
        <i className={`bx bx-chevron-down ${isExpanded ? 'show' : ''}`}></i>
      </div>
      <div className="option_children" {...getCollapseProps()}>
        {children.map((item, itemIndex) => (
          <div key={itemIndex} className="option_children_item">
            <Link to={item.path} className={`option_children_item_link ${pathname === item.path ? 'active' : ''}`}>
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default DropdownCollapse;
