import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';

const [colorNotHover, colorHover] = ['#1e1f26', '#3b3c54'];
let currentBtn = 0;

function TestCase(props) {
  const { data, testCase } = props;
  const [currentCase, setCurrentCase] = React.useState(0);

  const handleClick = (index) => {
    currentBtn = index;
    setCurrentCase(index);
  };

  const renderTestCase = testCase || data.input;

  return (
    <div className='container_test-case'>
      <h2>Test Case</h2>
      <div className='test-case'>
        <div className='test-case_list'>
          {renderTestCase.map((item, index) => (
            <button
              key={index}
              style={{ background: index === currentBtn ? colorHover : colorNotHover }}
              onClick={() => handleClick(index)}
            >
              Case {index + 1}
              {testCase &&
                (item.data.status.description === 'Accepted' ? (
                  <FontAwesomeIcon icon={faCheck} color='green' />
                ) : (
                  <FontAwesomeIcon icon={faExclamation} color='red' />
                ))}
            </button>
          ))}
        </div>
        <div className='test-case_content'>
          <div>Input: {data.input[currentCase].content} </div>
          <div>Output: {data.output[currentCase].content} </div>
          <div>Point: {data.output[currentCase].point} </div>
          {testCase && (
            <div>
              <div>
                Result: {testCase[currentCase].data.stdout || testCase[currentCase].data.stderr}
              </div>
              <div>Excute time: {testCase[currentCase].data.time}</div>
              <div>Memory: {testCase[currentCase].data.memory}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestCase;
