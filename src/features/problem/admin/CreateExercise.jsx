import React, { useState } from 'react';
import Button from 'components/Button';
import { useMutation, useQuery } from '@apollo/client';
import MDEditor from '@uiw/react-md-editor';
import { GET_ALL_EXERCISE } from 'graphql/Queries';
import { INSERT_PROBLEM, UPDATE_PROBLEM } from 'graphql/Mutation';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateExercise = () => {
  const location = useLocation();
  const exerciseData = location.state?.exerciseData;
  const navigate = useNavigate();
  // const [questionList, setQuestionList] = useState([{ question: '' }]);

  // const handleQuestionChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...questionList];
  //   list[index][name] = value;
  //   setQuestionList(list);
  // };

  const haveExerciseData = exerciseData ? true : false;
  const [input, setInput] = useState(
    haveExerciseData
      ? {
          name: exerciseData.name,
          level: exerciseData.level,
          topic: exerciseData.topic.join(', '),
          metadata: exerciseData.metadata,
        }
      : {},
  );
  const [value, setValue] = useState(haveExerciseData ? exerciseData.des : '');
  const [caseData, setCaseData] = useState(haveExerciseData ? exerciseData.metadata : [{}]);

  const [saveExercise] = useMutation(INSERT_PROBLEM);
  const [updateExercise] = useMutation(UPDATE_PROBLEM);

  const handleQuestionAdd = () => {
    console.log(caseData);
    // setCaseData([...caseData, inputCase]);
  };

  const handleQuestionRemove = (index) => {
    const list = [...caseData];
    list.splice(index, 1);
    setCaseData(list);
  };

  // const handleAddCase = () => {
  //   setCaseData([...caseData, inputCase]);
  //   return setOpen(false);
  // };

  const handleChange = (e) => {
    console.log(caseData);
    setCaseData([
      ...caseData,
      ...(e.target.name === 'point'
        ? { [e.target.name]: parseInt(e.target.value, 10) }
        : { [e.target.name]: e.target.value }),
    ]);
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
    const allTags = input.tag.split(', ').join(', ');
    if (haveExerciseData) {
      updateExercise({
        variables: {
          exerciseId: exerciseData.id,
          name: input.title,
          level: input.level ? input.level : 1,
          des: value,
          topic: [allTags],
          metadata: caseData,
          status: 'active',
          updatedAt: moment(),
        },
        refetchQueries: [GET_ALL_EXERCISE],

        onError: (err) => {
          alert(err.message);
        },
      });
    } else {
      saveExercise({
        variables: {
          name: input.title,
          level: input.level ? input.level : 1,
          des: value,
          topic: [allTags],
          metadata: caseData,
        },
        refetchQueries: [GET_ALL_EXERCISE],

        onError: (err) => {
          alert(err.message);
        },
      });
    }
    navigate('/admin/problems');
  };

  return (
    <div className="container-card">
      <div className="card">
        <h3>Tạo bài toán</h3>
        <div className="card__item">
          <label>Tiêu đề: </label>
          <input
            name="title"
            onChange={handleChangeInput}
            className="card__item-text card__item-input"
            defaultValue={input.name}
          ></input>
        </div>
        <div className="card__item wrap">
          <label>Mức: </label>

          <select name="level" onChange={handleChangeInput} defaultValue={input.level}>
            <option value={1}>Dễ</option>
            <option value={2}>Trung bình</option>
            <option value={3}>Khó</option>
          </select>

          <label>Từ khóa: </label>
          <input
            name="tag"
            onChange={handleChangeInput}
            className="card__item-text card__item-input"
            defaultValue={input.topic}
          ></input>
        </div>
        <div className="card__item">
          <label>Nội dung: </label>
          <div data-color-mode="light">
            <div className="wmde-markdown-var"> </div>
            <MDEditor
              name="des"
              value={value}
              height={600}
              onChange={(val) => {
                setValue(val);
              }}
            />
          </div>
        </div>

        <div name="topic" className="card__item ">
          <div className="problem_head">
            <div className="problem_head_title">
              <span>Tất cả các case</span>
            </div>
          </div>
        </div>

        {caseData.length > 0 &&
          caseData.map((item, index) => (
            <div key={index}>
              <div className="card__body">
                <div className="card__body-control">
                  <input
                    defaultValue={item.input}
                    type="text"
                    name="input"
                    placeholder="Đầu vào"
                    onChange={handleChange}
                  />
                </div>
                <div className="card__body-control">
                  <input
                    defaultValue={item.output}
                    type="text"
                    name="output"
                    placeholder="Đầu ra"
                    onChange={handleChange}
                  />
                </div>

                <div className="card__body-control">
                  <input
                    defaultValue={item.point}
                    type="number"
                    name="point"
                    placeholder="Điểm"
                    onChange={handleChange}
                  />
                </div>
                <div className="card__body-control">
                  <input
                    defaultValue={item.time}
                    type="text"
                    name="time"
                    placeholder="Thời gian"
                    onChange={handleChange}
                  />
                </div>
                <div className="card__body-submit">
                  {caseData.length > 0 && (
                    <Button backgroundColor="red" className="btn" onClick={() => handleQuestionRemove(index)}>
                      Xóa
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        <div className="card__crud">
          <Button className="btn" onClick={handleQuestionAdd} isDisabled={caseData.length ? false : true}>
            Thêm case
          </Button>

          <Button backgroundColor="green" onClick={handleSaveExercise}>
            Lưu bài toán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateExercise;
