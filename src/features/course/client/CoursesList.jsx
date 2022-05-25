import { useQuery } from '@apollo/client';
import Helmet from 'components/Helmet';
import PageLoading from 'components/PageLoading';
import ServerError from 'components/ServerError';
import { GET_ALL_COURSE } from 'graphql/Queries';
import React from 'react';
import { useAuth } from 'hooks/useAuth';
import CourseCard from './CourseCard';

const CoursesList = () => {
  const auth = useAuth();
  const { loading, error, data } = useQuery(GET_ALL_COURSE);

  if (loading) return <PageLoading />;
  if (error) return <ServerError />;

  return (
    <Helmet title={'Khóa học'}>
      {auth.user && (
        <section className="progress">
          <div className="progress__container">
            <h2 className="progress__welcome">
              Xin chào <span> {auth.user.email}</span> Chào mừng bạn đến với CodingWar
            </h2>
            <div className="progress__wrap">
              <div className="progress__main">
                <div className="progress__user">
                  <img
                    src={auth.user.avatarUrl || '/static/defaultAvatar.jpg'}
                    alt="avatar"
                    className="progress__user__avatar"
                  />
                  <div className="progress__user__info">
                    <h3 className="progress__user__info-name">{auth.user.fullName}</h3>
                  </div>
                </div>
                <div className="progress__block">
                  <div className="progress__block__header">
                    <div className="progress__block__exp">2.00 EXP</div>
                    <i className="bx bx-medal "></i>
                  </div>
                  <div className="progress__block__progress-bar"></div>
                </div>
              </div>
              <div className="progress__detail">
                <div className="progress__item">
                  <h4>Khóa học</h4>
                  <div className="progress__item__content">
                    <span className="progress__item__result">1/19</span>
                  </div>
                  <div className="progress__item__progress">
                    <div className="progress__item__progress-bar" style={{ width: `calc(${1} / ${20} * 100%)` }}></div>
                  </div>
                </div>
                <div className="progress__item">
                  <h4>Luyện tập</h4>
                  <div className="progress__item__content">
                    <span className="progress__item__result">0/1672</span>
                  </div>
                  <div className="progress__item__progress"></div>
                </div>
                <div className="progress__item">
                  <h4>Thứ hạng tốt nhất</h4>
                  <div className="progress__item__contest">
                    <span className="progress__item__result">0/0</span>
                    <span className="progress__item__progress-contest">Cuộc thi</span>
                  </div>
                  <div className="progress__item__progress"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <div className="course animate__animated animate__fadeInDown">
        <h2>Danh Sách Khoá Học</h2>
        <div className="course_body">
          {data.courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
        <div className="course_footer"></div>
      </div>
    </Helmet>
  );
};

export default CoursesList;
