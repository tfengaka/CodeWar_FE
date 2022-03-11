import React from 'react';

import LogoUTC from '../../../assets/LogoUTC.png';

export default function ItemContest() {
  const options = [
    {
      content: 'Nội dung',
      time: 'Ngày giờ tổ chức',
      day: 'Số ngày diễn ra',
      text: 'Đang diễn ra',
      color: '#00dd55',
    },
    {
      content: 'Nội dung',
      time: 'Ngày giờ tổ chức',
      day: 'Số ngày diễn ra',
      text: 'Đã kết thúc',
      color: '#ed4014',
    },
  ];
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
