import Button from 'components/Button';
import React from 'react';
import { useLocation } from 'react-router-dom';
import ProblemSolve from '../../../components/ProblemSolve';
import Countdown, { zeroPad } from 'react-countdown';

const Competition = () => {
  const location = useLocation();
  let { data } = location.state;

  const [currentExercise, setCurrentExercise] = React.useState(0);

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
    <div className="competition">
      <div className="competition_header">
        <div className="competition_header-left">
          {data.map((_, index) => (
            <Button
              key={index}
              onClick={() => setCurrentExercise(index)}
              backgroundColor={currentExercise === index ? 'green' : null}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <div className="competition_header-right">
          <Countdown date={Date.now() + 5000} renderer={renderer} />
          <Button>Nộp bài</Button>
        </div>
      </div>
      <div>
        <ProblemSolve isContest={true} exerciseContest={data[currentExercise]} />
      </div>
    </div>
  );
};

export default Competition;
