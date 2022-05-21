import { useQuery } from '@apollo/client';
import PageLoading from 'components/PageLoading';
import ServerError from 'components/ServerError';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GET_ALL_CONCEPT_IN_COURSE } from 'graphql/Queries';

const CourseDetail = () => {
  const location = useLocation();
  const { courseData } = location.state;

  const { loading, error, data } = useQuery(GET_ALL_CONCEPT_IN_COURSE, {
    variables: {
      courseId: courseData.id,
    },
  });

  if (loading) return <PageLoading />;
  if (error) return <ServerError />;

  return (
    <div className="course-detail">
      <div className="course-detail_banner">
        <h1>{courseData.name}</h1>
        <div className="banner_header">
          <br />
          <img
            src="https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/275368185_2158782244296225_2996082221714874021_n.jpg?_nc_cat=108&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=Gu9auXSDeAEAX8IUXZn&tn=QwtPadnGUAAFdHtj&_nc_ht=scontent.fhan3-3.fna&oh=00_AT9sIpiEK5ZLIqdx2Runo3nDIZwd84GP6aan2wNpuH9GsA&oe=62886C72"
            alt=""
          />
          <div className="banner_content">
            <h2>{courseData.account.fullName}</h2>
            <p>{courseData.des}</p>
          </div>
        </div>
      </div>
      <div className="course-concepts">
        {data?.concepts?.map((concept) => (
          <div className="course-concepts_card">
            <div className="course-concepts_card-title">
              <h2>{concept.name}</h2>
            </div>
            <div className="course-concepts_card-exercise">
              {concept.exercises.map((exercise, index) => (
                <Link
                  className="exercise_number"
                  to={`/problem/${exercise?.id?.substr(0, 8).toUpperCase()}`}
                  state={{ data: exercise }}
                >
                  <h3>{index + 1}</h3>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;
