import React from 'react';
import { Link } from 'react-router-dom';
import LogoUTC from '../../../assets/images/logo-utc.png';
import { conversionURL } from '../info/ConversionURL';
import { format, parse } from 'date-fns';

const ItemContest = (props) => {
  const options = props.itemProps;

  const colorStart = '#00dd55';
  const colorEnd = '#ed4014';

  const itemStart = options
    .filter((b) => b.status === 'Đang diễn ra')
    .map(({ id, name, des, startDate, endDate, status }) => ({
      id,
      name,
      des,
      startDate,
      endDate,
      status,
      colorStart,
    }));

  const itemEnd = options
    .filter((b) => b.status === 'Đã kết thúc')
    .map(({ id, name, des, startDate, endDate, status }) => ({
      id,
      name,
      des,
      startDate,
      endDate,
      status,
      colorEnd,
    }));

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
                  <i className="bx bxs-circle" style={{ color: item.colorStart }}></i> {item.status}
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
              </div>
              <div className="status">
                <div className="status__tag">
                  <i className="bx bxs-circle" style={{ color: item.colorEnd }}></i> {item.status}
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
