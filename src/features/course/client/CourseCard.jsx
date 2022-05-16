import Button from 'components/Button';
import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="course_item">
      <img src={course.image} alt="" />
      <div className="course_item-content">
        <h4>{course.name}</h4>
        <p>{course.des}</p>
      </div>
      <div className="course_item-footer">
        <Button>Học ngay</Button>
      </div>
    </div>
  );
};

export default CourseCard;
