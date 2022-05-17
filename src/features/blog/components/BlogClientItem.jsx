import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
const BlogClientItem = ({ id, title, content, thumbnail, account, createdAt }) => {
  return (
    <div className="blog_item">
      <div className="blog_item_body">
        <div className="blog_item_body_info">
          <Link to={`/blog/${id.substr(0, 8)}`} state={{ id }}>
            <h3>{title}</h3>
          </Link>
          <p>{`${content.substr(0, 250)}...`}</p>
          <div className="blog_item_body_info_author">
            <span>{`Tác giả: ${String(account.fullName)}`}</span>
            <span>{`Đăng tải lúc: ${moment(createdAt).format('DD/MM/YYYY')}`}</span>
          </div>
        </div>
        {thumbnail && (
          <div className="blog_item_body_thumb">
            <Link to={`/blog/${id.substr(0, 8)}`} state={{ id }}>
              <img src={thumbnail} alt="thumbnail" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogClientItem;
