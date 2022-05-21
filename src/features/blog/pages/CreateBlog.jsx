import Button from 'components/Button';
import Helmet from 'components/Helmet';
import MDEditor from 'components/MarkDownEdior/MDEditor';
import React from 'react';

const CreateBlog = () => {
  const [content, setContent] = React.useState('');
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
        <div className="title">
          <input type="text" placeholder="Tiêu đề bài viết...." className="input_control" />
          <Button size="lg">
            <i className="bx bx-upload"></i>
            Đăng tải
          </Button>
        </div>
        <MDEditor style={{ height: '780px' }} value={content} onChange={setContent} onImageUpload={onImageUpload} />
      </section>
    </Helmet>
  );
};

export default CreateBlog;
