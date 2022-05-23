import React from 'react';
import { Link } from 'react-router-dom';
import LogoUTC from '../../../assets/images/logo-utc.png';
import { conversionURL } from './ConversionURL';
import { format, parse } from 'date-fns';

const ItemContest = (props) => {
  const options = props.itemProps;

  const colorStart = '#00dd55';
  const colorEnd = '#ed4014';
  const statusStart = 'Đang diễn ra';
  const statusEnd = 'Đã kết thúc';

  const itemStart = options
    .filter((b) => {
      const date1 = new Date(b.endDate);
      const date2 = new Date();
      if (date1.getTime() >= date2.getTime() && b.status !== 'deleted') {
        return b;
      }
    })
    .map(({ id, name, des, startDate, endDate }) => ({
      id,
      name,
      des,
      startDate,
      endDate,
      statusStart,
      colorStart,
    }));

  const itemEnd = options
    .filter((b) => {
      const date1 = new Date(b.endDate);
      const date2 = new Date();
      if (date1.getTime() < date2.getTime() && b.status !== 'deleted') {
        return b;
      }
    })
    .map(({ id, name, des, startDate, endDate }) => ({
      id,
      name,
      des,
      startDate,
      endDate,
      statusEnd,
      colorEnd,
    }));

  return (
    <div className="panel_body">
      <ol>
        {itemStart.map((item) => (
          <li key={item.id}>
            <div className="body_card">
              <img src={LogoUTC} alt="" className="body_card--logo" />
              <div className="body_card--content">
                <h3>
                  <Link to={'/contest/' + conversionURL(item.name) + '.' + item.id + '.html'}>{item.name}</Link>
                </h3>
                <p>{item.des}</p>
              </div>
              <div className="body_card--item">
                <div className="date">
                  <i className="bx bx-calendar"></i>
                  {format(parse(item.endDate, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()), 'dd-MM-yyyy h:mm aa')}
                </div>
                <div className="status">
                  <i className="bx bxs-circle" style={{ color: item.colorStart }}></i> {item.statusStart}
                </div>
              </div>
            </div>
          </li>
        ))}
        {itemEnd.map((item) => (
          <li key={item.id}>
            <div className="body_card">
              <img src={LogoUTC} alt="" className="body_card--logo" />
              <div className="body_card--content">
                <h3>
                  <Link to={'/contest/' + conversionURL(item.name) + '.' + item.id + '.html'}>{item.name}</Link>
                </h3>
                <p>{item.des}</p>
              </div>
              <div className="body_card--item">
                <div className="date">
                  <i className="bx bx-calendar"></i>
                  {format(parse(item.endDate, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()), 'dd-MM-yyyy h:mm aa')}
                </div>
                <div className="status">
                  <i className="bx bxs-circle" style={{ color: item.colorEnd }}></i> {item.statusEnd}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ItemContest;
