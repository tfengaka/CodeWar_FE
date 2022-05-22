import React from 'react';
import { Link } from 'react-router-dom';
import LogoUTC from '../../../assets/images/logo-utc.png';
import { conversionURL } from '../info/ConversionURL';
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
  console.log(itemEnd);

  return (
    <div className="panel__body">
      <ol>
        {itemStart.map((item) => (
          <li key={item.id} className="body__item">
            <div className="row__flex">
              <img src={LogoUTC} alt="" className="logo" />
              <div className="content__main">
                <p className="title">
                  <Link to={'/contest/' + conversionURL(item.name) + '.' + item.id + '.html'}>{item.name}</Link>
                </p>
                <p>{item.des}</p>
                <ul className="detail">
                  <li>
                    <i className="bx bx-calendar"></i>
                    {'Bắt đầu: ' +
                      format(parse(item.startDate, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()), 'dd-MM-yyyy h:mm aa')}
                  </li>
                  {/* <li>
                    <i className='bx bx-time'></i>{' '}
                    {(new Date(item.endDate).getTime() - new Date(item.startDate).getTime()) /
                      (1000 * 3600 * 24)}
                  </li> */}
                </ul>
              </div>
              <div className="status">
                <div className="status__tag">
                  <i className="bx bxs-circle" style={{ color: item.colorStart }}></i> {item.statusStart}
                </div>
              </div>
            </div>
          </li>
        ))}
        {itemEnd.map((item) => (
          <li key={item.id} className="body__item">
            <div className="row__flex">
              <img src={LogoUTC} alt="" className="logo" />
              <div className="content__main">
                <p className="title">
                  <Link to={'/contest/' + conversionURL(item.name) + '.' + item.id + '.html'}>{item.name}</Link>
                </p>
                <ul className="detail">
                  <li>
                    <i className="bx bx-calendar"></i>
                    {'Bắt đầu: ' +
                      format(parse(item.startDate, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()), 'dd-MM-yyyy h:mm aa')}
                  </li>
                  {/* <li>
                    <i className='bx bx-time'></i> {item.endDate}
                  </li> */}
                </ul>
                <p>{item.des}</p>
              </div>
              <div className="status">
                <div className="status__tag">
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
