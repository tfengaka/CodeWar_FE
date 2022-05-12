import axios from 'axios';
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
  const runCode = async () => {
    setLoading(true);
    if (!sourceCode) {
      alert('Thực thi thất bại! Vui lòng kiểm tra lại bài làm');
      setLoading(false);
      return;
    }
    let program;
    try {
      const result = await Promise.all(
        metadata.map(async (testcase, index) => {
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

  const runAllCaseAndSubmit = async () => {
    console.log('runAllCaseAndSubmit');
  };

  return { language, loading, resultData, setLanguage, setSourceCode, runCode, runAllCaseAndSubmit };
}
