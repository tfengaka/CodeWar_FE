import React from 'react';

function Button(props) {
  const backgroundColor = props.backgroundColor ? 'bg-' + props.backgroundColor : 'bg-main';
  const size = props.size ? 'btn-' + props.size : '';

  return (
    <button className={`btn ${backgroundColor} ${size}`} onClick={props.onClick}>
      {props.icon ? (
        <span className="btn__icon">
          <i className={props.icon}></i>
        </span>
      ) : null}
      <span className="btn__text">{props.children}</span>
    </button>
  );
}
export default Button;
