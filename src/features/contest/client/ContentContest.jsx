import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_EXERCISE_CONTEST } from 'graphql/Queries';
import { conversionURL } from './ConversionURL';
import { format, parse } from 'date-fns';
import ServerError from 'components/ServerError';
import PageLoading from 'components/PageLoading';
import Button from 'components/Button';

const ContentContest = () => {
  const location = useLocation();
  const item = location.state?.item;

  const { error, loading, data } = useQuery(GET_ALL_EXERCISE_CONTEST, {
    variables: {
      contestId: item.id,
    },
  });
  if (loading) return <PageLoading />;
  if (error) return <ServerError />;

  return (
    <div className="content">
      <div className="content__container">
        <div className="content__description">
          <div className="content__card">
            <div className="content__card--head">{item.name}</div>
            <div className="content__card--extra">
              <i
                className="bx bxs-circle"
                style={{ color: item.colorStart != null ? item.colorStart : item.colorEnd }}
              ></i>{' '}
              {item.statusStart != null ? item.statusStart : item.statusEnd}
            </div>
            <div className="content__card--body">{item.des}</div>
            <div className="content__card--button">
              {item.statusStart != null ? (
                <Link
                  to={`/contest/${conversionURL(item.name)}/competition`}
                  state={{ contestData: data?.contests_by_pk }}
                >
                  <Button>Làm bài</Button>
                </Link>
              ) : null}
            </div>
          </div>
          <div className="content__table">
            <div className="content__table--item"> Bắt đầu</div>
            <div className="content__table--item"> Kết thúc</div>
            {/* <div className='content__table--item'> Số ngày diễn ra</div> */}
            <div className="content__table--item"> Người tạo</div>
            <div>{format(parse(item.startDate, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()), 'dd-MM-yyyy h:mm aa')}</div>
            <div>{format(parse(item.endDate, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()), 'dd-MM-yyyy h:mm aa')}</div>
            {/* <div>{value.day}</div> */}
            <div className="content__table--createBy">
              {item.account ? (
                <img id="avatar-contest_list" src={item.account?.avatarUrl} alt="" />
              ) : (
                <i className="bx bxs-user-circle" style={{ fontSize: 40 }}></i>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentContest;
