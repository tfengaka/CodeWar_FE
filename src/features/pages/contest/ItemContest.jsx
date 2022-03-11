import React from 'react';

import LogoUTC from '../../../assets/LogoUTC.png';

export default function ItemContest() {
  return (
    <div className="panel__body">
      <ol>
        <li className="body__item">
          <div className="row__flex">
            <img src={LogoUTC} alt="" className="logo" />
            <div className="content__main">
              <p className="title">Nội dung</p>
              <ul className="detail">
                <li>
                  <i className="bx bx-calendar" style={{ color: '#f07e5e' }}></i>
                  Ngày giờ tổ chức
                </li>
                <li>
                  <i className="bx bx-time" style={{ color: '#f07e5e' }}></i> Số ngày diễn ra
                </li>
              </ul>
            </div>
            <div className="status">
              <div className="status__tag">
                <i className="bx bxs-circle" style={{ color: '#00dd55' }}></i> Đang diễn ra
              </div>
            </div>
          </div>
        </li>
        <li className="body__item">
          <div className="row__flex">
            <img src={LogoUTC} alt="" className="logo" />
            <div className="content__main">
              <p className="title">Nội dung</p>
              <ul className="detail">
                <li>
                  <i className="bx bx-calendar" style={{ color: '#f07e5e' }}></i>
                  Ngày giờ tổ chức
                </li>
                <li>
                  <i className="bx bx-time" style={{ color: '#f07e5e' }}></i> Số ngày diễn ra
                </li>
              </ul>
            </div>
            <div className="status">
              <div className="status__tag">
                <i className="bx bxs-circle" style={{ color: '#ed4014' }}></i> Đã kết thúc
              </div>
            </div>
          </div>
        </li>
      </ol>
    </div>
  );
}
