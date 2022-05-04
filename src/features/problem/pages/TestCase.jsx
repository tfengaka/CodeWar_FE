import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';

const [colorNotHover, colorHover] = ['#1e1f26', '#3b3c54'];
const [colorTabNotFocus, colorTabFocus] = ['#232432', '#1e1f26'];
let currentBtn = 0;

function TestCase(props) {
  const { data, testCase } = props;
  const [currentCase, setCurrentCase] = React.useState(0);
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleClick = (index) => {
    currentBtn = index;
    setCurrentCase(index);
  };

  const getColorCurrentTab = (tab) => (currentTab === tab ? colorTabFocus : colorTabNotFocus);
  const handleClickTab = () => setCurrentTab((prevData) => -(prevData - 1));

  const renderTestCase = testCase || data.input;

  const getContent = () => {
    if (!currentTab)
      return (
        <div className='test-case_content'>
          <div>Input: {data.input[currentCase]?.content} </div>
          <div>Output: {data.output[currentCase].content} </div>
          <div>Point: {data.output[currentCase].point} </div>
        </div>
      );
    else if (testCase && currentTab)
      return (
        <div className='test-case_content'>
          <div>Excute time: {testCase[currentCase].data.time}</div>
          <div>Memory: {testCase[currentCase].data.memory}</div>
          <div>
            Result:
            <br />
            {console.log(testCase[currentCase].data)}
            &emsp;
            {testCase[currentCase].data.stdout ||
              testCase[currentCase].data.stderr ||
              testCase[currentCase].data.compile_output}
          </div>
        </div>
      );
    return (
      <div className='test-case_content'>
        <div>No Result</div>
      </div>
    );
  };

  return (
    <div className='container_test-case'>
      <div className='header_test-case'>
        <button onClick={handleClickTab} style={{ background: getColorCurrentTab(0) }}>
          Test Case
        </button>
        <button onClick={handleClickTab} style={{ background: getColorCurrentTab(1) }}>
          Console
        </button>
      </div>
      <div className='test-case'>
        <div className='test-case_list'>
          {renderTestCase.map((item, index) => (
            <button
              key={index}
              style={{ background: index === currentBtn ? colorHover : colorNotHover }}
              onClick={() => handleClick(index)}
            >
              Case {index + 1} &emsp;
              {testCase &&
                (item.data.status.description === 'Accepted' ? (
                  <FontAwesomeIcon icon={faCheck} color='green' />
                ) : (
                  <FontAwesomeIcon icon={faExclamation} color='red' />
                ))}
            </button>
          ))}
        </div>
        {getContent()}
      </div>
    </div>
  );
}

export default TestCase;
