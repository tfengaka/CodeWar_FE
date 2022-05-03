import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getContests } from 'graphql/Queries';
import { conversionURL } from './ConversionURL';
import { format, parse } from 'date-fns';

const ContentContest = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const colorStart = '#00dd55';
  const colorEnd = '#ed4014';

  const { loading, error, data } = useQuery(getContests);
  if (loading) return <div className='loading'></div>;
  if (error) return <div>Load data failed</div>;

  const itemStart = data?.contests
    ?.filter(
      (b) =>
        '/contest/' + conversionURL(b.name) + '.' + b.id + '.html' === pathName &&
        b.status === 'Đang diễn ra'
    )
    .map(({ id, name, des, startDate, endDate, status, createdBy }) => ({
      id,
      name,
      des,
      startDate,
      endDate,
      status,
      createdBy,
      colorStart,
    }));

  const itemEnd = data?.contests
    .filter(
      (b) =>
        '/contest/' + conversionURL(b.name) + '.' + b.id + '.html' === pathName &&
        b.status === 'Đã kết thúc'
    )
    .map(({ id, name, des, startDate, endDate, status, createdBy }) => ({
      id,
      name,
      des,
      startDate,
      endDate,
      status,
      createdBy,
      colorEnd,
    }));

  return (
    <div className='content__container'>
      {itemStart.map((value) => (
        <div key={value.id} className='content__description'>
          <div className='content__card'>
            <div className='content__card--head'>{value.name}</div>
            <div className='content__card--extra'>
              <i className='bx bxs-circle' style={{ color: value.colorStart }}></i> {value.status}
            </div>
            <div className='content__card--body'>{value.des}</div>
            <button className='content__card--button'>Làm bài</button>
          </div>
          <div className='content__table'>
            <div className='content__table--item'> Bắt đầu</div>
            <div className='content__table--item'> Kết thúc</div>
            {/* <div className='content__table--item'> Số ngày diễn ra</div> */}
            <div className='content__table--item'> Người tạo</div>
            <div>
              {format(
                parse(value.startDate, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()),
                'dd-MM-yyyy h:mm aa'
              )}
            </div>
            <div>
              {format(
                parse(value.endDate, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()),
                'dd-MM-yyyy h:mm aa'
              )}
            </div>
            {/* <div>{value.day}</div> */}
            <div>{value.createdBy}</div>
          </div>
        </div>
      ))}

      {itemEnd.map((value) => (
        <div key={value.id} className='content__description'>
          <div className='content__card'>
            <div className='content__card--head'>{value.name}</div>
            <div className='content__card--extra'>
              <i className='bx bxs-circle' style={{ color: value.colorEnd }}></i> {value.status}
            </div>
            <div className='content__card--body'>{value.des}</div>
          </div>
          <div className='content__table'>
            <div className='content__table--item'> Bắt đầu</div>
            <div className='content__table--item'> Kết thúc</div>
            {/* <div className='content__table--item'> Số ngày diễn ra</div> */}
            <div className='content__table--item'> Người tạo</div>
            <div>
              {format(
                parse(value.startDate, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()),
                'dd-MM-yyyy h:mm aa'
              )}
            </div>
            <div>
              {format(
                parse(value.endDate, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()),
                'dd-MM-yyyy h:mm aa'
              )}
            </div>
            {/* <div>{value.day}</div> */}
            <div>{value.createdBy}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentContest;
