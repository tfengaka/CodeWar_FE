import React from 'react';

import LogoUTC from '../../../assets/LogoUTC.png';

export default function ItemContest(props) {
  const options = props.itemProps;

  return (
    <div className="panel__body">
      <ol>
        {options.map((item, index) => (
          <li key={index} className="body__item">
            <div className="row__flex">
              <img src={LogoUTC} alt="" className="logo" />
              <div className="content__main">
                <p className="title">{item.content}</p>
                <ul className="detail">
                  <li>
                    <i className="bx bx-calendar"></i>
                    {item.time}
                  </li>
                  <li>
                    <i className="bx bx-time"></i> {item.day}
                  </li>
                </ul>
              </div>
              <div className="status">
                <div className="status__tag">
                  <i className="bx bxs-circle" style={item}></i> {item.text}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
