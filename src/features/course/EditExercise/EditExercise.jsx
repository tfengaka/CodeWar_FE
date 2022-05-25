import Button from 'components/Button';
import Dropdown from 'components/Dropdown';
import MDEditor from 'components/MarkDownEdior/MDEditor';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EditExercise.module.scss';

const levelOptions = [
  {
    value: 1,
    name: 'Dễ',
  },
  {
    value: 2,
    name: 'Trung bình',
  },
  {
    value: 3,
    name: 'Khó',
  },
];

const EditExercise = () => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [level, setLevel] = React.useState({
    value: 1,
    name: 'Dễ',
  });
  const [showDropdown, setShowDropdown] = React.useState(false);
  return (
    <div className={styles.exercise}>
      <div className="table_head">
        <div className="rollback" onClick={() => navigate(-1)}>
          <i className="bx bx-arrow-back"></i>
          <span>Quay lại</span>
        </div>
        <div className="table_head_title">
          <span>{'Tiêu đề'}</span>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.exercise_title}>
          <span className="course title">Chủ đề:</span>
          <div className={styles.exercise_title_input}>
            <input
              type="text"
              className="input_control"
              placeholder="Tiêu đề...."
              value={'Concept Name'}
              disabled={true}
            />
          </div>
        </div>
        <div className={styles.exercise_title}>
          <span className="course title">Tiêu đề bài tập - Độ khó</span>
          <div className={styles.exercise_title_input}>
            <input
              type="text"
              className="input_control"
              placeholder="Tiêu đề...."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div
              className={`${styles.exercise_dropdown} ${showDropdown && styles.active}`}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span>{level.name}</span>
              <i className="bx bx-chevron-down"></i>
              {showDropdown && (
                <Dropdown setActive={setShowDropdown}>
                  {levelOptions.map((item, index) => (
                    <div
                      key={index}
                      className="dropdown_item"
                      onClick={() => {
                        setShowDropdown(false);
                        setLevel(item);
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
                </Dropdown>
              )}
            </div>
          </div>
        </div>

        <div className={styles.exercise_content}>
          <span className="course title">Nội dung bài tập</span>
          <MDEditor style={{ height: '500px' }} value={content} onChange={setContent} />
        </div>
        <div className={styles.testcases}>
          <span className="course title">Testcase</span>
          <Testcase />
        </div>
      </div>
    </div>
  );
};
const Testcase = () => {
  return (
    <div className={styles.exercise_title_input}>
      <input type="text" className="input_control" placeholder="Tiêu đề...." />
      <input type="text" className="input_control" placeholder="Tiêu đề...." />
      <input type="text" className="input_control" placeholder="Tiêu đề...." />
      <Button backgroundColor="red">Xoá</Button>
    </div>
  );
};

export default EditExercise;
