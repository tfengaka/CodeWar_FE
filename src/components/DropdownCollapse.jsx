import React from 'react';
import useCollapse from 'react-collapsed';
import { Link } from 'react-router-dom';

const DropdownCollapse = ({ title, children }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <>
      <div className={`option_button ${isExpanded ? 'active' : ''}`} {...getToggleProps()}>
        {title}
        <i className="bx bx-list-ul"></i>
      </div>
      <div className="option_children" {...getCollapseProps()}>
        {children.map((item, itemIndex) => (
          <div key={itemIndex} className="option_children_item">
            <Link to={item.path} className="option_children_item_link">
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default DropdownCollapse;
