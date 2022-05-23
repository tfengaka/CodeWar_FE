import { useMutation } from '@apollo/client';
import Button from 'components/Button';
import Helmet from 'components/Helmet';
import PageLoading from 'components/PageLoading';
import { INSERT_COURSE, UPDATE_COURSE_IMAGE } from 'graphql/Mutation';
import { useFirebase } from 'hooks/useFirebase';
import { useRedirect } from 'hooks/useRedirect';
import React, { useState } from 'react';

const CreateCourse = () => {
  const [input, setInput] = useState({
    name: '',
    des: '',
  });
  const { loading, uploadFile } = useFirebase('CourseThumbnail');
  const { redirect } = useRedirect('course');
  const [file, setFile] = useState(null);
  const thumbnailRef = React.useRef(null);
  const [saveCourse] = useMutation(INSERT_COURSE);
  const [updateCourseImage] = useMutation(UPDATE_COURSE_IMAGE);

  const handleChangeInput = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    let courseId = null;

    await saveCourse({
      variables: {
        name: input.name,
        des: input.des,
      },
      onCompleted: (data) => {
        courseId = data.insert_courses.returning[0].id;
      },
      onError: (error) => {
        alert(error.message);
      },
    });
    uploadFile(file, courseId, file.type, (url) => {
      updateCourseImage({
        variables: {
          courseId: courseId,
          image: url,
        },
        onCompleted: () => {
          alert('Thêm khóa học thành công');
          redirect();
        },
        onError: (error) => {
          alert(error.message);
        },
      });
    });
  };

  return (
    <Helmet title="Viết blog">
      <section className="blog post">
        <h3 className="blog__header">Tạo khóa học</h3>
        <h3 className="blog__label">Tiêu đề</h3>
        <div className="title">
          <input
            value={input.name}
            name="name"
            type="text"
            placeholder="Tiêu đề bài viết...."
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
        <Button onClick={handleSubmit}>Tạo khóa học</Button>
      </section>
      {loading && <PageLoading />}
    </Helmet>
  );
};

export default CreateCourse;
