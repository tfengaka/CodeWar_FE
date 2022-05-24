import Button from 'components/Button';
import React from 'react';
import ProblemSolve from '../../../components/ProblemSolve';

const Competition = ({ exercisesData, component: Component, ...rest }) => {
  const [currentExercise, setCurrentExercise] = React.useState(0);
  const [sourceCode, setSourceCode] = React.useState([]);

  return (
    <div className="competition">
      <div className="competition_header">
        <div className="competition_header-left">
          {exercisesData.map((_, index) => (
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
          <Component {...rest} />
          <Button>Nộp bài</Button>
        </div>
      </div>
      <div>
        <ProblemSolve
          isContest={true}
          exerciseContest={exercisesData[currentExercise]}
          currentExercise={currentExercise}
          sourceCodeOfContest={sourceCode}
          setSourceCodeOfContest={setSourceCode}
        />
      </div>
    </div>
  );
};

export default Competition;
