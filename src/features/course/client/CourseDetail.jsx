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
            src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/275368185_2158782244296225_2996082221714874021_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=IeX3_nADEU4AX9T-Bdy&tn=QwtPadnGUAAFdHtj&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT_fpuTiL894v5qlmGmOvRgCd2vL5aFFs3GlSyWqE3AX0A&oe=628E5B32"
            alt=""
          />
          <div className="banner_content">
            <h2>{courseData.account.fullName}</h2>
            <p>{courseData.des}</p>
          </div>
        </div>
      </div>
      <div className="course-concepts">
        {data?.concepts?.map((concept, index) => (
          <div className="course-concepts_card" key={index}>
            <div className="course-concepts_card-title">
              <h2>{concept.name}</h2>
            </div>
            <div className="course-concepts_card-exercise">
              {concept.exercises.map((exercise, index) => (
                <Link
                  className="exercise_number"
                  key={index}
                  to={`/problem/${exercise?.id?.substr(0, 8).toUpperCase()}`}
                  state={{ data: exercise }}
                >
                  {index + 1}
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
