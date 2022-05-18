import MDEditor from '@uiw/react-md-editor';
import React from 'react';
import moment from 'moment';
const BlogContent = ({ title, content, createdAt, account }) => {
  return (
    <div className="blog_detail">
      <div className="blog_detail_title">
        <h3>{title}</h3>
      </div>
      <div className="blog_detail_header">
        <div className="blog_detail_header_user">
          <div className="blog_detail_header_user_avatar">
            <img src="https://static.fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg" alt="" />
          </div>
          <div className="blog_detail_header_user_info">
            <span>{`Tác giả: ${String(account.fullName)}`}</span>
            <div className="date">
              <span>{`Đăng tải ngày: ${moment(createdAt).format('DD/MM/YYYY')}`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="blog_detail_content">
        <MDEditor.Markdown source={content} />
      </div>
    </div>
  );
};

export default BlogContent;
