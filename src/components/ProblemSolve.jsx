import Editor from '@monaco-editor/react';
import axios from 'axios';
import TestCase from 'features/problem/pages/TestCase';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button';

const languageOptions = {
  C: {
    id: 75,
    value: 'c',
  },
  CPP: {
    id: 76,
    value: 'cpp',
  },
  CSharp: {
    id: 17,
    value: 'csharp',
  },
  Java: {
    id: 62,
    value: 'java',
  },
  JavaScript: {
    id: 63,
    value: 'javascript',
  },
};

const ProblemSolve = (props) => {
  const location = useLocation();
  const { data } = location.state;
  const [language, setLanguage] = React.useState(languageOptions.C);
  const [code, setCode] = React.useState('');
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [checkAllCase, setCheckAllCase] = React.useState(null);

  const handleSubmit = async () => {
    let program = null;

    try {
      const result = await Promise.all(
        data.input.map(async (item, index) => {
          program = {
            stdin: item.content,
            source_code: code,
            language_id: language.id,
            expected_output: data.output[index].content,
          };

          return axios.post(
            `http://localhost:2358/submissions/?base64_encoded=false&wait=true`,
            program
          );
        })
      );
      setCheckAllCase(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <div className='editor'>
        <div className='editor_problem'>
          <div className='editor_problem_header'>
            <h3>{data?.name}</h3>
          </div>
          <div className='editor_problem_body'>
            <div className='editor_problem_body_content'>
              <h4>Đề bài</h4>
              <pre>{data?.des}</pre>
            </div>
          </div>
        </div>
      </div>
      <div className='editor'>
        <div className='editor_header'>
          <div className='editor_header_language'>
            <span>Ngôn ngữ </span>
            <div
              className='editor_header_language_input'
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span>{language.value}</span>
              <i className='bx bx-chevron-down'></i>
              <div className={`editor_header_language_dropdown ${showDropdown ? 'active' : ''}`}>
                {Object.keys(languageOptions).map((key, index) => (
                  <div
                    className='editor_header_language_dropdown_item'
                    key={index}
                    onClick={() => setLanguage(languageOptions[key])}
                  >
                    {languageOptions[key].value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='editor_body'>
          <Editor
            className='code-area'
            width='100%'
            height='500px'
            options={{
              minimap: {
                enabled: false,
              },
              fontSize: 16,
              cursorStyle: 'line',
              wordWrap: 'on',
            }}
            theme='vs-dark'
            language={language.value}
            onChange={(value, event) => setCode(value)}
          />
          <TestCase data={data} testCase={checkAllCase} />
          <div className='editor_submit'>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </div>
      <footer></footer>
    </div>
  );
};

export default ProblemSolve;
