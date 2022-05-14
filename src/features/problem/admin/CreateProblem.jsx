import React, { useState } from 'react';
import Button from 'components/Button';
import { useMutation } from '@apollo/client';
import MDEditor from '@uiw/react-md-editor';
import { INSERT_PROBLEM } from 'graphql/Mutation';
// import * as Yup from 'yup';
const CreateProblem = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({});
  const [caseData, setCaseData] = useState([]);
  const [inputCase, setInputCase] = useState({});
  // const [openInput, setOpenInput] = useState(false);
  const [value, setValue] = useState('');
  const [saveExercise] = useMutation(INSERT_PROBLEM);

  // const problemValidation = Yup.object({
  //   displayName: Yup.string().required('Tên không được để trống'),
  //   email: Yup.string().email('Email không đúng định dạng').required('Email không được để trống'),
  // });

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
    const allTags = input.tag.split(', ').join(' ');

    saveExercise({
      variables: {
        name: input.title,
        level: input.level ? input.level : 1,
        des: value,
        topic: [allTags],
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
        <div className="card__item wrap">
          <label>Mức: </label>
          <select name="level" onChange={handleChangeInput}>
            <option value={1}>Dễ</option>
            <option value={2}>Trung bình</option>
            <option value={3}>Khó</option>
          </select>

          <label>Từ khóa: </label>
          <input name="tag" onChange={handleChangeInput} className="card__item-text card__item-input"></input>
          {/* {data.map((item, index) => (
            <div className="card__list-tag" key={index}>
              <div className="card__list-tag__item">{item.tag}</div>
            </div>
          ))} */}
        </div>
        <div className="card__item">
          <label>Nội dung: </label>
          <MDEditor
            name="des"
            value={value}
            onChange={(val) => {
              setValue(val);
            }}
          />
        </div>

        <div className="card__item ">
          {caseData.length > 0 && (
            <div className="problem">
              <div className="problem_container">
                <div className="problem_head">
                  <div className="problem_head_title">
                    <span>Tất cả các case</span>
                  </div>
                </div>

                <div className="problem_option">
                  <div className="problem_option_panel"></div>
                </div>

                <div className="problem_content">
                  <div className="problem_content_table">
                    <div className="problem_content_table_header">
                      <table className="table">
                        <colgroup>
                          <col width="100" />
                          <col width="100" />
                          <col width="150" />
                          <col width="150" />
                        </colgroup>
                        <thead>
                          <tr>
                            <th className="table_header">
                              <div className="table_cell">
                                <span>Case</span>
                              </div>
                            </th>
                            <th className="table_header">
                              <div className="table_cell">
                                <span>Đầu vào</span>
                              </div>
                            </th>
                            <th className="table_header">
                              <div className="table_cell">
                                <span>Đầu ra</span>
                              </div>
                            </th>
                            <th className="table_header">
                              <div className="table_cell">
                                <span>Điểm</span>
                              </div>
                            </th>
                            <th className="table_header">
                              <div className="table_cell">
                                <span>Thời gian chạy</span>
                              </div>
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <div className="problem_content_table_body">
                      <table className="table">
                        <colgroup>
                          <col width="100" />
                          <col width="100" />
                          <col width="150" />
                          <col width="150" />
                        </colgroup>
                        <tbody className="table_body">
                          {caseData.map((item, index) => (
                            <TableRow key={index} data={item} no={index} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

const TableRow = ({ data, no }) => {
  const { input, output, point, time } = data;

  return (
    <tr className="table_row">
      <td>
        <div className="table_cell">{++no}</div>
      </td>
      <td>
        <div className="table_cell shadow">{input}</div>
      </td>
      <td>
        <div className="table_cell shadow">{output}</div>
      </td>
      <td>
        <div className="table_cell">{point} đ</div>
      </td>
      <td>
        <div className="table_cell">{time} ms</div>
      </td>
    </tr>
  );
};

export default CreateProblem;
