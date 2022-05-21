import { useQuery } from '@apollo/client';
import PageLoading from 'components/PageLoading';
import ServerError from 'components/ServerError';
import { GET_ALL_COURSE } from 'graphql/Queries';
import React from 'react';
import CourseCard from './CourseCard';

const CoursesList = () => {
  const { loading, error, data } = useQuery(GET_ALL_COURSE);

  console.log(error);
  if (loading) return <PageLoading />;
  if (error) return <ServerError />;

  console.log(data);
  return (
    <div className="course">
      <h2>Danh Sách Khoá Học</h2>
      <div className="course_body">
        {data.courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
      <div className="course_footer"></div>
    </div>
  );
};

export default CoursesList;
