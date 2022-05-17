import { useQuery } from '@apollo/client';
import { GET_ALL_COURSE } from 'graphql/Queries';
import React from 'react';
import CourseCard from './CourseCard';

const CoursesList = () => {
  const { loading, error, data } = useQuery(GET_ALL_COURSE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

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
