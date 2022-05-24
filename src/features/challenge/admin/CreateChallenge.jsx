import Helmet from 'components/Helmet';
import CreateExercise from 'features/problem/admin/CreateExercise';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const CreateChallenge = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [input, setInput] = useState({
    name: '',
    des: '',
  });

  const [file, setFile] = useState(null);
  const thumbnailRef = React.useRef(null);

  const handleChangeInput = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Helmet title="Viết blog">
      <section className="blog post">
        <h3 className="blog__header">Tạo thử thách</h3>
        <h3 className="blog__label">Tiêu đề</h3>
        <div className="title">
          <input
            value={input.name}
            name="name"
            type="text"
            placeholder="Tiêu đề...."
            className="input_control"
            onChange={(e) => handleChangeInput(e)}
          />
          <button onClick={() => thumbnailRef.current.click()}>
            <input type="file" style={{ display: 'none' }} ref={thumbnailRef} onChange={(e) => handleChange(e)} />
            <i className="bx bx-image-add" style={{ fontSize: '3rem' }}></i>
          </button>
        </div>
        <div className="blog__content">
          <h3>Nội dung</h3>
          <div className="blog__content__input">
            <textarea
              name="des"
              value={input.des}
              autoComplete="off"
              spellCheck="false"
              placeholder="Nội dung"
              onChange={(e) => handleChangeInput(e)}
            ></textarea>
            <div
              style={{
                width: '100%',
                maxWidth: '770px',
                padding: '40px',
                height: '615px',
                backgroundColor: '#eee',
              }}
            >
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  style={{
                    width: '100%',
                    maxWidth: '450px',
                    height: '100%',
                    transform: 'translateX(127px)',
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="datetime">
          <div>
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
          </div>
          <div>
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
          </div>
        </div>
        <CreateExercise isChallenge={true} inputChallenge={input} file={file} startDate={startDate} endDate={endDate} />
      </section>
    </Helmet>
  );
};

export default CreateChallenge;
