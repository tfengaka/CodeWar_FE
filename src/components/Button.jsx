import React from 'react';
function Button(props) {
  const backgroundColor = props.backgroundColor ? 'bg-' + props.backgroundColor : 'bg-main';
  const size = props.size ? 'btn-' + props.size : '';

  return (
    <button type={props.type} className={`btn ${backgroundColor} ${size}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
export default Button;
