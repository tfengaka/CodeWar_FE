import React, { useState } from 'react';
import Button from 'components/Button';
import { useMutation } from '@apollo/client';
import { INSERT_PROBLEM } from 'graphql/Mutation';

const CreateProblem = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({});
  const [caseData, setCaseData] = useState([]);
  const [inputCase, setInputCase] = useState({});
  const [tag, setTag] = useState([]);

  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [openNewColumnFrom, setOpenNewColumnFrom] = useState(false);
  const tonggleOpenNewColumnFrom = () => setOpenNewColumnFrom(!openNewColumnFrom);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const [saveExercise] = useMutation(INSERT_PROBLEM);

  const data = [
    {
      id: 1,
      tag: 'c++',
    },
    {
      id: 1,
      tag: 'c#',
    },
    {
      id: 1,
      tag: 'javascript',
    },
  ];

  const handleAddCase = () => {
    setCaseData([...caseData, inputCase]);
    return setOpen(false);
  };

  const handleChange = (e) => {
    setInputCase({
      ...inputCase,
      ...(e.target.name === 'point'
        ? { [e.target.name]: parseInt(e.target.value, 10) }
        : { [e.target.name]: e.target.value }),
    });
  };
  const handleChangeInput = (e) => {
    setInput({
      ...input,
      ...(e.target.name === 'level'
        ? { [e.target.name]: parseInt(e.target.value, 10) }
        : { [e.target.name]: e.target.value }),
    });
  };

  const handleSaveExercise = () => {
    saveExercise({
      variables: {
        name: input.title,
        level: input.level ? input.level : 1,
        des: input.des,
        topic: input.tag,
        metadata: caseData,
      },
      onCompleted: () => {
        alert('Success');
      },
      onError: (err) => {
        alert(err.message);
      },
    });
  };

  return (
    <div className="container-card">
      <div className="card">
        <h3>Tạo bài toán</h3>
        <div className="card__item">
          <label>Tiêu đề: </label>
          <input name="title" onChange={handleChangeInput} className="card__item-text card__item-input"></input>
        </div>
        <div className="card__item">
          <label>Nội dung: </label>
          <textarea name="des" onChange={handleChangeInput} rows="10" className="card__item-text card__item-input" />
        </div>
        <div className="card__item ">
          <label>Mức: </label>
          <select name="level" onChange={handleChangeInput}>
            <option value={1}>Dễ</option>
            <option value={2}>Trung bình</option>
            <option value={3}>Khó</option>
          </select>
        </div>

        <div className="card__item">
          <label>Từ khóa: </label>
          {/* <input name="tag" onChange={handleChangeInput} className="card__item-text card__item-input"></input> */}
          {/* {data.map((item, index) => (
            <div className="card__list-tag" key={index}>
              <div className="card__list-tag__item">{item.tag}</div>
            </div>
          ))} */}
          {!openNewColumnFrom && (
            <Row>
              <Col className="add-new-column" onClick={tonggleOpenNewColumnFrom}>
                <i className="fa fa-plus icon" />
                Add another column
              </Col>
            </Row>
          )}

          {openNewColumnFrom && (
            <div className="enter-new-column">
              <div
                size="sm"
                type="text"
                placeholder="Enter column title ..."
                className="input-enter-new-column"
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                // event Enter change click addNewColumn
                onKeyDown={(event) => event.key === 'Enter' && addNewColumn()}
              ></div>

              <Button variant="success" size="sm" onClick={addNewColumn}>
                Add table
              </Button>
              <span className="cancel-icon" onClick={tonggleOpenNewColumnFrom}>
                <i className="fa fa-times icon" />
              </span>
            </div>
          )}
        </div>

        <div className="card__item ">
          {caseData.length > 0 && (
            <>
              <label>Danh sách các case: </label>
              {caseData.map((item, index) => (
                <div className="card__list-case" key={index}>
                  <div className="card__list-case__item">Đầu vào: {item.input}</div>
                  <div className="card__list-case__item">Đầu ra {item.output}</div>
                  <div className="card__list-case__item">Điểm {item.point}</div>
                  <div className="card__list-case__item">Thời gian chạy {item.time}</div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="card__btn">
          <Button onClick={() => setOpen(!open)}>Thêm case</Button>
          <Button backgroundColor="green" onClick={handleSaveExercise}>
            Lưu bài toán
          </Button>
        </div>

        {open && (
          <div className="card__modal">
            <div className="card__modal__body">
              <div className="card__modal__body-control">
                <input type="text" name="input" placeholder="Đầu vào" onChange={handleChange} />
              </div>
              <div className="card__modal__body-control">
                <input type="text" name="output" placeholder="Đầu ra" onChange={handleChange} />
              </div>

              <div className="card__modal__body-control">
                <input type="number" name="point" placeholder="Điểm" onChange={handleChange} />
              </div>
              <div className="card__modal__body-control">
                <input type="text" name="time" placeholder="Thời gian" onChange={handleChange} />
              </div>
              <div className="card__modal__body-submit">
                <Button onClick={handleAddCase}>Lưu</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProblem;
