import { useMutation } from '@apollo/client';
import Button from 'components/Button';
import { INSERT_CONTEST } from 'graphql/Mutation';
import { getContests } from 'graphql/Queries';
import { useAuth } from 'hooks/useAuth';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const CreateContest = () => {
  const auth = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [inputName, setInputName] = useState('');
  const [inputDes, setInputDes] = useState('');

  const [saveContests] = useMutation(INSERT_CONTEST);

  const handleListAdd = () => {
    saveContests({
      variables: {
        name: inputName,
        des: inputDes,
        startDate: moment(startDate).format('YYYY-MM-DDTHH:mm:ssZ'),
        endDate: moment(endDate).format('YYYY-MM-DDTHH:mm:ssZ'),
        status: 'Đang diễn ra',
        createdBy: auth.user.fullName,
      },
      onCompleted: () => {
        alert('Thêm thành công');
        setInputName('');
        setInputDes('');
        setStartDate(new Date());
        setEndDate(new Date());
      },
      onError: (error) => {
        alert(error.message);
      },
      refetchQueries: [getContests],
    });
  };

  // const [questionList, setQuestionList] = useState([{ question: '' }]);

  // const handleQuestionChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...questionList];
  //   list[index][name] = value;
  //   setQuestionList(list);
  // };

  // const handleQuestionAdd = () => {
  //   setQuestionList([...questionList, { question: '' }]);
  // };

  // const handleQuestionRemove = (index) => {
  //   const list = [...questionList];
  //   list.splice(index, 1);
  //   setQuestionList(list);
  // };

  return (
    <>
      <div className="create_container">
        <div className="create_description">
          <h1>Tạo cuộc thi</h1>
          <ul>
            <div className="create_card">
              <li>
                <h3>Tiêu đề</h3>
                <div className="create_card--input">
                  <input
                    autoComplete="off"
                    spellCheck="false"
                    type="text"
                    placeholder="Tiêu đề"
                    onChange={(e) => setInputName(e.target.value)}
                  ></input>
                </div>
              </li>
              <li>
                <h3>Nội dung</h3>
                <div className="create_card--input">
                  <textarea
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="Nội dung"
                    onChange={(e) => setInputDes(e.target.value)}
                  ></textarea>
                </div>
              </li>
              <div className="datetime">
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
              <li>
                <div className="create_card--button">
                  <Button onClick={() => handleListAdd()}>Lưu</Button>
                </div>
              </li>
              {/* {questionList.map((item, index) => (
                <li key={index}>
                  <h3>Câu hỏi</h3>
                  <div className="create_card--input">
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
                    <Button>Chọn câu hỏi</Button>
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
                    <Button>Lưu</Button>
                  </div>
                </li>
              ))} */}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CreateContest;
