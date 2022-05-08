import MonacoEditor, { useMonaco } from '@monaco-editor/react';
import axios from 'axios';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Modal from '../features/auth/client/Modal';
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

  const { isLogged } = useAuth();
  const [showModal, setShowModal] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const monaco = useMonaco();

  const [language, setLanguage] = React.useState(languageOptions.C);
  const [code, setCode] = React.useState('');
  const [checkAllCase, setCheckAllCase] = React.useState(null);

  React.useEffect(() => {
    if (monaco)
      import('monaco-themes/themes/Dracula.json').then((data) => {
        monaco.editor.defineTheme('dracula', data);
        monaco.editor.setTheme('dracula');
      });
  }, [monaco]);

  const handleRun = async () => {
    if (!code) {
      return;
    }
    let program;
    try {
      const result = await Promise.all(
        data.input.map(async (item, index) => {
          program = {
            stdin: item.content,
            source_code: code,
            language_id: language.id,
            expected_output: data.output[index].content,
          };
          return axios.post(`http://localhost:2358/submissions/?base64_encoded=false&wait=true`, program);
        }),
      );
      setCheckAllCase(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {};

  return (
    <div className="container">
      <div className="editor">
        <div className="editor_problem">
          <div className="editor_problem_header">
            <h3>{data?.name}</h3>
          </div>
          <div className="editor_problem_body">
            <div className="editor_problem_body_content">
              <h4>Đề bài</h4>
              <pre>{data?.des}</pre>
            </div>
          </div>
        </div>
      </div>
      <div className="editor code_area">
        <div className="editor_header">
          <div className="editor_header_language">
            <span>Change Language </span>
            <div className="editor_header_language_input" onClick={() => setShowDropdown(!showDropdown)}>
              <span>{language.value}</span>
              <i className="bx bx-chevron-down"></i>
              <div className={`editor_header_language_dropdown ${showDropdown ? 'active' : ''}`}>
                {Object.keys(languageOptions).map((key, index) => (
                  <div
                    className="editor_header_language_dropdown_item"
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
        <div className="editor_body">
          <MonacoEditor
            className="code-area"
            options={{
              minimap: {
                enabled: false,
              },
              fontFamily: 'SF_Mono',
              fontSize: 14,
            }}
            theme="dracula"
            language={language.value}
            onChange={(value, event) => setCode(value)}
          />
          <TestCase testCaseData={data} resultData={checkAllCase} />
          <div className="editor_submit">
            <Button onClick={handleRun} backgroundColor="green" isDisabled={!isLogged}>
              Chạy thử
            </Button>
            <Button onClick={handleSubmit} isDisabled={!isLogged}>
              Nộp bài
            </Button>
          </div>
        </div>
      </div>
      {showModal && <Modal onShowModal={setShowModal} />}
    </div>
  );
};

const TestCase = (props) => {
  const { testCaseData, resultData } = props;

  const [currentCase, setCurrentCase] = React.useState(0);
  const [currentTab, setCurrentTab] = React.useState(0);
  const renderTestCase = resultData || testCaseData.output;

  return (
    <div className="testcase">
      <div className="testcase_header">
        <div className={`testcase_header_item ${currentTab === 0 ? 'active' : ''}`} onClick={() => setCurrentTab(0)}>
          Test Case
        </div>
        <div className={`testcase_header_item ${currentTab === 1 ? 'active' : ''}`} onClick={() => setCurrentTab(1)}>
          Console
        </div>
      </div>
      <div className="testcase_body">
        <div className="testcase_body_list">
          {renderTestCase.map((item, index) => (
            <div
              className={`testcase_body_list_item ${currentCase === index ? 'active' : ''}`}
              key={index}
              onClick={() => setCurrentCase(index)}
            >
              <span>Case {index + 1}</span>
              {resultData &&
                (item.data.status.description === 'Accepted' ? (
                  <i className="bx bxs-check-circle color-green"></i>
                ) : (
                  <i className="bx bxs-x-circle color-red"></i>
                ))}
            </div>
          ))}
        </div>
        <div className="testcase_body_result">
          {currentTab === 0 && (
            <div className="testcase_body_result_wrapper">
              <div className="testcase_body_result_item">
                <span>Dữ liệu vào:</span>
                <div className="testcase_body_result_item_value">
                  {testCaseData.input[currentCase] ? testCaseData.input[currentCase]?.content : '[]'}
                </div>
              </div>

              <div className="testcase_body_result_item">
                <span>Thời gian chạy:</span>
                <div className="testcase_body_result_item_value">
                  {resultData && resultData[currentCase].data.time
                    ? resultData[currentCase].data.time * 1000 + ' ms'
                    : '0 ms'}
                </div>
              </div>
              <div className="testcase_body_result_item">
                <span>Kết quả kỳ vọng:</span>
                <div className="testcase_body_result_item_value">{testCaseData.output[currentCase]?.content}</div>
              </div>
              <div className="testcase_body_result_item">
                <span>Bộ nhớ sử dụng:</span>
                <div className="testcase_body_result_item_value">
                  {resultData && resultData[currentCase].data.memory
                    ? resultData[currentCase].data.memory + ' KB'
                    : '0 KB'}
                </div>
              </div>
              <div className="testcase_body_result_item">
                <span>Kết quả chạy:</span>
                <div className="testcase_body_result_item_value">
                  {resultData && resultData[currentCase].data.stdout ? resultData[currentCase].data.stdout : '[]'}
                </div>
              </div>
              <div className="testcase_body_result_item">
                <span>Trạng thái:</span>
                <div className="testcase_body_result_item_value">
                  {resultData ? resultData[currentCase].data.status.description : 'None'}
                </div>
              </div>
            </div>
          )}
          {currentTab === 1 && (
            <div className="testcase_body_result_console">
              {resultData && resultData[currentCase].data.stdout ? (
                <div className="testcase_body_result_item">
                  <p>{resultData[currentCase].data.stdout}</p>
                </div>
              ) : (
                <div className="message-error">
                  {resultData ? (
                    resultData[currentCase].data.stderr || resultData[currentCase].data.compile_output
                  ) : (
                    <div className="testcase_body_result_console_empty">
                      <span>EMPTY CONSOLE</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemSolve;
