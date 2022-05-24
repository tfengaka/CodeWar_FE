import { useMutation } from '@apollo/client';
import Button from 'components/Button';
import { INSERT_CONTEST, UPDATE_CONTEST } from 'graphql/Mutation';
import { getContests } from 'graphql/Queries';
import { useAuth } from 'hooks/useAuth';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const UpdateContest = (props) => {
  const [updateContest] = useMutation(UPDATE_CONTEST);
  const show = props.show;
  const id = props.id;
  const name = props.name;
  const des = props.des;
  const startDatetime = props.startDatetime;
  const endDatetime = props.endDatetime;
  const auth = useAuth();
  const [startDate, setStartDate] = useState(new Date(startDatetime));
  const [endDate, setEndDate] = useState(new Date(endDatetime));
  const [inputName, setInputName] = useState(name);
  const [inputDes, setInputDes] = useState('');
  const onClose = props.onClose;
  if (!show) {
    return null;
  }

  const handleListUpdate = () => {
    updateContest({
      variables: {
        contestId: id,
        name: inputName,
        des: inputDes,
        startDate: moment(startDate).format('YYYY-MM-DDTHH:mm:ssZ'),
        endDate: moment(endDate).format('YYYY-MM-DDTHH:mm:ssZ'),
        status: 'Đang diễn ra',
        createdBy: auth.user.fullName,
      },
      onCompleted: () => {
        alert('Cập nhật thành công');
        onClose();
      },
      onError: (error) => {
        alert('Tiêu đề đã tồn tại');
        console.log(error.message);
      },
      refetchQueries: [getContests],
    });
  };

  const handleListReset = () => {
    setInputName(name);
    setInputDes(des);
    setStartDate(new Date(startDatetime));
    setEndDate(new Date(endDate));
    onClose();
  };
  return (
    <div className="update_container">
      <div className="update_description">
        <div className="close">
          <Button
            onClick={() => {
              handleListReset();
            }}
            className="btn"
          >
            X
          </Button>
        </div>
        <h1>Cập nhật cuộc thi</h1>
        <ul>
          <div className="update_card">
            <li>
              <h3>Tiêu đề</h3>
              <div className="update_card--input">
                <input
                  autoComplete="off"
                  spellCheck="false"
                  type="text"
                  placeholder="Tiêu đề"
                  onChange={(e) => setInputName(e.target.value)}
                  value={inputName}
                ></input>
              </div>
            </li>
            <li>
              <h3>Nội dung</h3>
              <div className="update_card--input">
                <textarea
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="Nội dung"
                  onChange={(e) => setInputDes(e.target.value)}
                >
                  {des}
                </textarea>
              </div>
            </li>
            <div className="datetime">
              <li>
                <h3>Ngày giờ bắt đầu</h3>
                <div className="update_card--input">
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
                <div className="update_card--input">
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
              <div className="update_card--button">
                <Button
                  onClick={() => {
                    handleListUpdate();
                  }}
                >
                  Cập nhật
                </Button>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default UpdateContest;