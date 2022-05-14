import { useMutation } from '@apollo/client';
import axios from 'axios';
import { SUBMIT_CODE } from 'graphql/Mutation';
import React from 'react';

const initialLanguage = {
  id: 76,
  value: 'cpp',
};

export function useCompiler(metadata) {
  const [language, setLanguage] = React.useState(initialLanguage);
  const [sourceCode, setSourceCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [resultData, setResultData] = React.useState(null);

  const [saveResult] = useMutation(SUBMIT_CODE);

  const handleSaveResult = (exerciseId) => {
    let totalTime = 0,
      totalMemory = 0,
      totalPoint = 0;
    let caseFailed = [];

    for (const [index, result] of resultData.entries()) {
      if (result.data.status.id === 3) {
        totalTime += parseFloat(result.data.time);
        totalMemory += result.data.memory;
        totalPoint += metadata[index].point;
      } else {
        caseFailed.push(index + 1);
      }
    }

    saveResult({
      variables: {
        exerciseId,
        excuteTime: totalTime,
        memory: totalMemory,
        point: totalPoint,
        caseFailed,
      },
      onCompleted: () => {
        alert('Đã lưu kết quả');
      },
      onError: (error) => {
        alert(`Lỗi lưu kết quả: ${error}`);
      },
    });
  };

  const runCode = async (exerciseId, isSaveExercise = false) => {
    if (resultData && isSaveExercise) {
      handleSaveResult(exerciseId);
      return;
    }

    setLoading(true);

    if (!sourceCode) {
      alert('Thực thi thất bại! Vui lòng kiểm tra lại bài làm');
      setLoading(false);

      return;
    }

    let program;
    try {
      const result = await Promise.all(
        metadata.map(async (testcase) => {
          program = {
            stdin: testcase.input,
            source_code: sourceCode,
            language_id: language.id,
            cpu_time_limit: Number(testcase.time / 1000),
            expected_output: testcase.output,
          };
          return axios.post(
            `${process.env.REACT_APP_JUDGE_API_URL}/submissions/?base64_encoded=false&wait=true`,
            program,
          );
        }),
      );

      if (result[0].data.error) {
        alert('Lỗi định dạng code! Vui lòng kiểm tra lại!');
        setLoading(false);
        return;
      }

      setResultData(result);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return { language, loading, resultData, setLanguage, setSourceCode, runCode };
}
