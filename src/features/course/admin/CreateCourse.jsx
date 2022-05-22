import { useMutation } from '@apollo/client';
import { uploadFileToFirebase } from 'app/uploadFIle';
import Button from 'components/Button';
import Helmet from 'components/Helmet';
import { INSERT_COURSE, UPDATE_COURSE_IMAGE } from 'graphql/Mutation';
import React, { useState } from 'react';

const CreateCourse = () => {
  const [input, setInput] = useState({
    name: '',
    des: '',
  });
  const [saveCourse] = useMutation(INSERT_COURSE);
  const [updateCourseImage] = useMutation(UPDATE_COURSE_IMAGE);
  let file = null;

  const handleChangeInput = (e) => {
    // console.log(e.target);
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChange = (e) => {
    file = e.target.files[0];
    var image = document.getElementById('output');
    const fileURL = URL.createObjectURL(file);
    image.src = fileURL;
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

    await uploadFileToFirebase(file, `CourseThumbnail/${courseId}`, file.type, courseId, async (id, url) =>
      updateCourseImage({
        variables: {
          courseId: id,
          image: url,
        },
        onError: (error) => {
          alert(error.message);
        },
      }),
    );
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
          <label onChange={(e) => handleChange(e)}>
            <input id="contained-button-file" type="file" style={{ display: 'none' }} />
            <i className="bx bx-image-add" style={{ fontSize: '6rem' }}></i>
          </label>
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
              <img
                id="output"
                alt=""
                style={{
                  width: '100%',
                  maxWidth: '450px',
                  height: '100%',
                  transform: 'translateX(127px)',
                }}
              />
            </div>
          </div>
        </div>
        <Button onClick={handleSubmit}>Tạo khóa học</Button>
      </section>
    </Helmet>
  );
};

export default CreateCourse;
