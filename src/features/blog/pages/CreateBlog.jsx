import { useMutation } from '@apollo/client';
import Button from 'components/Button';
import Helmet from 'components/Helmet';
import MDEditor from 'components/MarkDownEdior/MDEditor';
import { ADD_NEW_BLOG } from 'graphql/Mutation';
import { GET_ALL_BLOG } from 'graphql/Queries';
import { useAuth } from 'hooks/useAuth';
import React from 'react';

const CreateBlog = () => {
  const { user } = useAuth();
  const [addNewBlog] = useMutation(ADD_NEW_BLOG);
  const [content, setContent] = React.useState('');
  const [title, setTitle] = React.useState('');

  const onImageUpload = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (data) => {
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddNewBlog = () => {
    const blog = { blogContent: content, blogTitle: title, authorID: user.id };
    addNewBlog({
      variables: { ...blog },
      refetchQueries: [{ query: GET_ALL_BLOG }],
      onCompleted: () => {
        alert(`Bài viết ${blog.blogTitle} đã được tải lên!\nVui lòng đợi quản trị viên xét duyệt`);
      },
      onError: (err) => {
        alert('Có lỗi xảy ra trong quá trình tải lên, vui lòng thử lại sau');
      },
    });
  };

  return (
    <Helmet title="Viết blog">
      <section className="blog post">
        <div className="title">
          <input
            type="text"
            placeholder="Tiêu đề bài viết...."
            className="input_control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button size="lg" isDisabled={!user} onClick={() => handleAddNewBlog()}>
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
