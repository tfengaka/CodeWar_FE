import MonacoEditor, { useMonaco } from '@monaco-editor/react';
import MDEditor from '@uiw/react-md-editor';
import Discuss from 'features/problem/Discuss';
import { useCompiler } from 'hooks/useCompiler';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
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

const ProblemSolve = () => {
  const location = useLocation();
  const { data } = location.state;
  const auth = useAuth();
  const { loading, language, resultData, setLanguage, setSourceCode, runCode } = useCompiler(data.metadata);

  const [showDropdown, setShowDropdown] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState(0);
  const [currentCase, setCurrentCase] = React.useState(0);
  const [width, setWidth] = React.useState({
    left: '40%',
    right: '60%',
  });
  const [showDiscuss, setShowDiscuss] = React.useState(false);
  const [isMounth, setIsMounth] = React.useState(false);

  const monaco = useMonaco();
  React.useEffect(() => {
    if (monaco) {
      import('monaco-themes/themes/Dracula.json').then((data) => {
        monaco.editor.defineTheme('dracula', data);
        monaco.editor.setTheme('dracula');
      });
    }
  }, [monaco]);
  return (
    <div className="wrapper">
      <div className="panel left" style={{ width: width.left }}>
        <div className="problem">
          <center>
            <h3>{data?.name}</h3>
          </center>
          <div data-color-mode="light">
            <div className="wmde-markdown-var"> </div>
            <MDEditor.Markdown source={data?.des} />
          </div>
        </div>
      </div>

      <div className="panel right" style={{ width: width.right }}>
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
            className="monaco"
            options={{
              minimap: {
                enabled: false,
              },
              fontFamily: 'SF_Mono',
              fontSize: 14,
            }}
            theme="dracula"
            language={language.value}
            onChange={(value) => setSourceCode(value)}
          />
          <div className="testcase">
            <div className="testcase_header">
              <div
                className={`testcase_header_item ${currentTab === 0 ? 'active' : ''}`}
                onClick={() => setCurrentTab(0)}
              >
                Test Case
              </div>
              <div
                className={`testcase_header_item ${currentTab === 1 ? 'active' : ''}`}
                onClick={() => setCurrentTab(1)}
              >
                Console
              </div>
            </div>
            <div className="testcase_body">
              <div className="testcase_body_list">
                {data.metadata.map((_, index) => (
                  <div
                    key={index}
                    className={`testcase_body_list_item ${currentCase === index ? 'active' : ''}`}
                    onClick={() => setCurrentCase(index)}
                  >
                    <span>Case {index + 1}</span>
                    <div className="testcase_body_list_item_icon">
                      {loading && <div className="circleLoading sm"></div>}
                      {resultData && !loading && (
                        <div className="status">
                          {resultData[index].data.status.id === 3 ? (
                            <i className="bx bxs-check-circle color-green" />
                          ) : (
                            <i className="bx bxs-x-circle color-red" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="testcase_body_result">
                {currentTab === 0 && (
                  <>
                    <div className="testcase_body_result_item">
                      <span>Input</span>
                      <div className="testcase_body_result_item_value">
                        {data.metadata[currentCase].input ? data.metadata[currentCase].input : '[]'}
                      </div>
                    </div>

                    <div className="testcase_body_result_item">
                      <span>Output</span>
                      <div className="testcase_body_result_item_value">
                        {resultData && resultData[currentCase].data.stdout ? resultData[currentCase].data.stdout : '[]'}
                      </div>
                    </div>
                    <div className="testcase_body_result_item">
                      <span>Expected</span>
                      <div className="testcase_body_result_item_value">
                        {data.metadata[currentCase].output ? data.metadata[currentCase].output : '[]'}
                      </div>
                    </div>
                  </>
                )}
                {currentTab === 1 && (
                  <div className="testcase_body_result_console">
                    {resultData ? (
                      <React.Fragment>
                        {resultData[currentCase].data?.stdout ? (
                          <div className="testcase_body_result_item">{resultData[currentCase].data.stdout}</div>
                        ) : (
                          <div className="message-error">
                            {resultData[currentCase].data.compile_output || resultData[currentCase].data.stderr}
                          </div>
                        )}
                      </React.Fragment>
                    ) : (
                      <div className="testcase_body_result_console_empty">
                        <span>EMPTY CONSOLE</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="editor_submit">
            <Button onClick={() => runCode(data.id)} backgroundColor="green" isDisabled={!auth.isLogged}>
              Run Code
            </Button>
            <Button onClick={() => runCode(data.id, true)} isDisabled={!auth.isLogged || !resultData}>
              Submit
            </Button>
          </div>
        </div>
      </div>

      <div className="btn_popup" onClick={() => setShowDiscuss(true)}>
        <div className="btn_popup-content">
          <i className="bx bxs-message-rounded bx-md"></i>
          <span>Hỏi đáp</span>
        </div>
      </div>
      {showDiscuss && <Discuss exerciseId={data.id} setShowDiscuss={setShowDiscuss} />}
    </div>
  );
};

export default ProblemSolve;
