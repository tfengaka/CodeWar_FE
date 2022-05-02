import Button from 'components/Button';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateContest = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <>
      <div className='create_container'>
        <div className='create_description'>
          <ul className='create_card'>
            <li>
              <h3>Tiêu đề</h3>
              <div className='create_card--input'>
                <input
                  autoComplete='off'
                  spellCheck='false'
                  type='text'
                  placeholder='Tiêu đề'
                ></input>
              </div>
            </li>
            <li>
              <h3>Nội dung</h3>
              <div className='create_card--input'>
                <textarea autoComplete='off' spellCheck='false' placeholder='Nội dung'></textarea>
              </div>
            </li>
            <li>
              <h3>Ngày giờ bắt đầu</h3>
              <div className='create_card--input'>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  timeInputLabel='Time:'
                  dateFormat='dd/MM/yyyy h:mm aa'
                  showTimeInput
                  minDate={new Date()}
                />
              </div>
            </li>
            <li>
              <h3>Ngày giờ kết thúc</h3>
              <div className='create_card--input'>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  timeInputLabel='Time:'
                  dateFormat='dd/MM/yyyy h:mm aa'
                  showTimeInput
                  minDate={startDate}
                />
              </div>
            </li>
            <li>
              <h3>Câu hỏi</h3>
              <div className='create_card--input'>
                <textarea autoComplete='off' spellCheck='false' placeholder='Câu hỏi'></textarea>
              </div>
            </li>
            <Button>Lưu</Button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CreateContest;
