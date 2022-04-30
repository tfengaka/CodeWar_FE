import React from 'react';

const [colorNotHover, colorHover] = ['#1e1f26', '#3b3c54'];

let currentBtn = 0;

function TestCase(props) {
  const { data } = props;
  const [currentCase, setCurrentCase] = React.useState(0);

  const handleClick = (index) => {
    currentBtn = index;
    setCurrentCase(index);
  };

  return (
    <div className='container_test-case'>
      <h2>Test Case</h2>
      <div className='test-case'>
        <div className='test-case_list'>
          {data.map((_, index) => (
            <button
              key={index}
              style={{ background: index === currentBtn ? colorHover : colorNotHover }}
              onClick={() => handleClick(index)}
            >
              Case {index + 1}:
            </button>
          ))}
        </div>
        <div className='test-case_content'>
          <div>Input: {data[currentCase]?.input} </div>
          <div>Output: {data[currentCase]?.output} </div>
        </div>
      </div>
    </div>
  );
}

export default TestCase;
