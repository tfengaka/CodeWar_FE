import Button from 'components/Button';
import React from 'react';
import { CodeType, useCompiler } from 'hooks/useCompiler';
import ProblemSolve from '../../../components/ProblemSolve';
import PageLoading from 'components/PageLoading';

const Competition = ({ exercisesData, component: Component, ...rest }) => {
  const [sourceCode, setSourceCode] = React.useState([]);
  const [currentExercise, setCurrentExercise] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const { runCode, resultDataContest } = useCompiler();

  const handleSubmit = async () => {
    setLoading(true);

    if (sourceCode.length === 0) {
      return alert('Bạn chưa code bài nào cả sao nộp ?');
    }

    try {
      await Promise.all(
        exercisesData.map(async (exercise, index) => {
          await runCode(exercise, sourceCode[index], CodeType.Contest);
        }),
      );
      setLoading(false);
      setSourceCode([]);
      setCurrentExercise(0);
      console.log(resultDataContest);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
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
          <Button onClick={handleSubmit}>Nộp bài</Button>
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
      {loading && <PageLoading />}
    </div>
  );
};

export default Competition;
