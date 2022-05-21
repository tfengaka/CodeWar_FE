import React, { useState } from 'react';
import Button from 'components/Button';
import Helmet from 'components/Helmet';
import MDEditor from 'components/MarkDownEdior/MDEditor';

const CreateCourse = () => {
  const [content, setContent] = React.useState('');
  const [inputDes, setInputDes] = useState('');
  const onImageUpload = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (data) => {
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <Helmet title="Viết blog">
      <section className="blog post">
        <h3 className="blog__header">Tạo khóa học</h3>
        <h3 className="blog__label">Tiêu đề</h3>
        <div className="title">
          <input type="text" placeholder="Tiêu đề bài viết...." className="input_control" />
          <Button size="lg">
            <i className="bx bx-upload"></i>
            Upload file
          </Button>
        </div>
        <div className="blog__content">
          <h3>Nội dung</h3>
          <div className="blog__content__input">
            <textarea
              autoComplete="off"
              spellCheck="false"
              placeholder="Nội dung"
              onChange={(e) => setInputDes(e.target.value)}
            ></textarea>
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default CreateCourse;
