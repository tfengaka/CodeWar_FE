import React from 'react';
import { useLocation } from 'react-router-dom';

const CourseDetail = () => {
  const location = useLocation();
  const { courseData } = location.state;

  // console.log(courseData);
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
          <div>{courseData.account.fullName}</div>
        </div>
      </div>
      <div className="course-concepts"></div>
    </div>
  );
};

export default CourseDetail;
