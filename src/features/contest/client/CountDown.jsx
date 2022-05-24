import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { useLocation } from 'react-router-dom';
import Competition from './Competition';

const CompetitionCountDown = () => {
  const location = useLocation();
  let { contestData } = location.state;

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <h3>Hết giờ</h3>;
    }
    return (
      <h3>
        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </h3>
    );
  };
  return (
    <Competition
      exercisesData={contestData.exercises}
      component={Countdown}
      date={Date.now() + contestData.time}
      renderer={renderer}
    />
  );
};

export default CompetitionCountDown;
