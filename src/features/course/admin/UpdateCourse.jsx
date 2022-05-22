import React from 'react';

const UpdateCourse = (props) => {
  const show = props.show;
  const item = props.item;
  const onClose = props.onClose;
  if (!show) {
    return null;
  }
  return (
    <div>
      {/* <button className="close" onClick={onClose}>
        <i className="fa-solid fa-circle-xmark"></i>
      </button> */}
      <div>{console.log('áddsadsad')}</div>
    </div>
  );
};

export default UpdateCourse;
