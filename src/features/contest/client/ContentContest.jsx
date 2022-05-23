import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getContests } from 'graphql/Queries';
import { conversionURL } from './ConversionURL';
import { format, parse } from 'date-fns';
import ServerError from 'components/ServerError';
import PageLoading from 'components/PageLoading';
import Button from 'components/Button';

const ContentContest = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const colorStart = '#00dd55';
  const colorEnd = '#ed4014';
  const statusStart = 'Đang diễn ra';
  const statusEnd = 'Đã kết thúc';

  const { loading, error, data } = useQuery(getContests);
  if (loading) return <PageLoading />;
  if (error) return <ServerError />;

  const itemStart = data?.contests
    ?.filter((b) => '/contest/' + conversionURL(b.name) + '.' + b.id + '.html' === pathName)
    .filter((b) => {
      const date1 = new Date(b.endDate);
      const date2 = new Date();
      if (date1.getTime() >= date2.getTime() && b.status !== 'deleted') {
        return b;
      }
    })
    .map(({ id, name, des, startDate, endDate, createdBy }) => ({
      id,
      name,
      des,
      startDate,
      endDate,
      statusStart,
      createdBy,
      colorStart,
    }));

  const itemEnd = data?.contests
    .filter((b) => '/contest/' + conversionURL(b.name) + '.' + b.id + '.html' === pathName)
    .filter((b) => {
      const date1 = new Date(b.endDate);
      const date2 = new Date();
      if (date1.getTime() < date2.getTime() && b.status !== 'deleted') {
        return b;
      }
    })
    .map(({ id, name, des, startDate, endDate, createdBy }) => ({
      id,
      name,
      des,
      startDate,
      endDate,
      statusEnd,
      createdBy,
      colorEnd,
    }));

  return (
    <div className="content">
      <div className="content__container">
        {itemStart.map((value) => (
          <div key={value.id} className="content__description">
            <div className="content__card">
              <div className="content__card--head">{value.name}</div>
              <div className="content__card--extra">
                <i className="bx bxs-circle" style={{ color: value.colorStart }}></i> {value.statusStart}
              </div>
              <div className="content__card--body">{value.des}</div>
              <div className="content__card--button">
                <Link to={`/contest/${conversionURL(value.name)}.${value.id}.html/start`}>
                  <Button>Làm bài</Button>
                </Link>
              </div>
            </div>
            <div className="content__table">
              <div className="content__table--item"> Bắt đầu</div>
              <div className="content__table--item"> Kết thúc</div>
              {/* <div className='content__table--item'> Số ngày diễn ra</div> */}
              <div className="content__table--item"> Người tạo</div>
              <div>{format(parse(value.startDate, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()), 'dd-MM-yyyy h:mm aa')}</div>
              <div>{format(parse(value.endDate, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()), 'dd-MM-yyyy h:mm aa')}</div>
              {/* <div>{value.day}</div> */}
              <div className="content__table--createBy">
                <i className="bx bxs-user-circle" style={{ fontSize: 40 }}></i>
              </div>
            </div>
          </div>
        ))}

        {itemEnd.map((value) => (
          <div key={value.id} className="content__description">
            <div className="content__card">
              <div className="content__card--head">{value.name}</div>
              <div className="content__card--extra">
                <i className="bx bxs-circle" style={{ color: value.colorEnd }}></i> {value.statusEnd}
              </div>
              <div className="content__card--body">{value.des}</div>
            </div>
            <div className="content__table">
              <div className="content__table--item"> Bắt đầu</div>
              <div className="content__table--item"> Kết thúc</div>
              {/* <div className='content__table--item'> Số ngày diễn ra</div> */}
              <div className="content__table--item"> Người tạo</div>
              <div>{format(parse(value.startDate, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()), 'dd-MM-yyyy h:mm aa')}</div>
              <div>{format(parse(value.endDate, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()), 'dd-MM-yyyy h:mm aa')}</div>
              {/* <div>{value.day}</div> */}
              <div className="content__table--createBy">
                <i className="bx bxs-user-circle" style={{ fontSize: 40 }}></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentContest;
