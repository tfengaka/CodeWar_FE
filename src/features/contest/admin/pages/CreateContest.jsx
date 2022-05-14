import Button from 'components/Button';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MDEditor from '@uiw/react-md-editor';

const CreateContest = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [questionList, setQuestionList] = useState([{ question: '' }]);

  function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
  }

  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...questionList];
    list[index][name] = value;
    setQuestionList(list);
  };

  const handleQuestionAdd = () => {
    setQuestionList([...questionList, { question: '' }]);
  };

  const handleQuestionRemove = (index) => {
    const list = [...questionList];
    list.splice(index, 1);
    setQuestionList(list);
  };

  const [value, setValue] = React.useState("");

  return (
    <>
      <div className="create_container">
        <div className="create_description">
          <h1>Tạo cuộc thi</h1>
          <ul>
            <li>
              <h3>Tiêu đề</h3>
              <div className="create_card--input">
                <input autoComplete="off" spellCheck="false" type="text" placeholder="Tiêu đề"></input>
              </div>
            </li>
            <li>
              <h3>Nội dung</h3>
              <div className="create_card--input" data-color-mode="light">
                <MDEditor
                  value={value}
                  onChange={(val) => {
                    setValue(val);
                  }}
                />
                {/* <textarea autoComplete="off" spellCheck="false" placeholder="Nội dung"></textarea> */}
              </div>
            </li>
            <div className="create_card">
              <li>
                <h3>Ngày giờ bắt đầu</h3>
                <div className="create_card--input">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    showTimeInput
                    minDate={new Date()}
                  />
                </div>
              </li>
              <li>
                <h3>Ngày giờ kết thúc</h3>
                <div className="create_card--input">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    showTimeInput
                    minDate={startDate}
                  />
                </div>
              </li>
            </div>
            {questionList.map((item, index) => (
              <li key={index}>
                <h3>Câu hỏi</h3>
                <div className="create_card--question">
                  <textarea
                    name="question"
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="Câu hỏi"
                    value={item.question}
                    onChange={(e) => handleQuestionChange(e, index)}
                    required
                  ></textarea>
                </div>
                <div className="create_card--button">
                  {questionList.length - 1 === index && questionList.length < 4 && (
                    <Button backgroundColor="green" className="btn" onClick={handleQuestionAdd}>
                      Thêm câu hỏi
                    </Button>
                  )}
                  {questionList.length > 1 && (
                    <Button backgroundColor="red" className="btn" onClick={() => handleQuestionRemove(index)}>
                      Xóa
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <Button>Lưu</Button>
        </div>
      </div>
    </>
  );
};

export default CreateContest;
