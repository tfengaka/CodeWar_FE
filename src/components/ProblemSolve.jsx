import Editor from '@monaco-editor/react';
import axios from 'axios';
import React from 'react';
import Button from './Button';

const languageOptions = [
  {
    id: 1,
    value: 'c',
  },
  {
    id: 2,
    value: 'cpp',
  },
  {
    id: 3,
    value: 'csharp',
  },
  {
    id: 4,
    value: 'java',
  },
  {
    id: 5,
    value: 'javascript',
  },
];

const ProblemSolve = (props) => {
  const [language, setLanguage] = React.useState('c');
  const [code, setCode] = React.useState('');
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleSubmit = async () => {
    let program = {
      stdin: '1 2',
      files: [
        {
          name: `main.${language}`,
          content: code,
        },
      ],
    };
    axios.defaults.headers.common['Authorization'] = 'Token 256d9800-329c-40ee-b483-708344d30ec5';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    const res = await axios.post(`/api/run/${language}/latest`, program);
    console.log(res);
  };

  return (
    <div className='container'>
      <div className='editor'>
        <div className='editor_problem'>
          <div className='editor_problem_header'>
            <h3>Tiêu Đề</h3>
          </div>
          <div className='editor_problem_body'>
            <div className='editor_problem_body_content'>
              <h4>Đề bài</h4>
              <p>
                Viết chương trình cho phép nhập số nguyên a và b từ bàn phím. Tính và in kết quả a +
                b
              </p>
            </div>
            <div className='editor_problem_body_content'>
              <h4>Dữ liệu vào</h4>
              <ul>
                <li>2 số nguyên aa và bb cách nhau 1 dấu cách</li>
              </ul>
            </div>
            <div className='editor_problem_body_content'>
              <h4>Dữ liệu ra</h4>
              <ul>
                <li>Tổng của a và b</li>
              </ul>
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
              <span>{language}</span>
              <i className='bx bx-chevron-down'></i>
              <div className={`editor_header_language_dropdown ${showDropdown ? 'active' : ''}`}>
                {languageOptions.map((item) => (
                  <div
                    className='editor_header_language_dropdown_item'
                    key={item.id}
                    onClick={() => setLanguage(item.value)}
                  >
                    {item.value}
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
            language={language}
            onChange={(value, event) => setCode(value)}
          />
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
