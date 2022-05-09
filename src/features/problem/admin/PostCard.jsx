import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/Button';

const PostCard = () => {
  return (
    <div className="card ">
      <form className="card__info">
        <h4>Tạo bài toán</h4>
        <div className="card__info-item">
          <label>Tiêu đề: </label>
          <input className="card__info__text"></input>
        </div>
        <div className="card__info-item">
          <label>Nội dung: </label>
          <textarea rows="10" className="card__info__text" />
        </div>
        <div className="card__info-item">
          <label>Mức: </label>
          <input className="card__info__text"></input>
        </div>

        <div className="card__info-item">
          <label>Từ khóa: </label>
          <input className="card__info__text"></input>
        </div>
        <div className="card__info-item">
          <label>Đầu ra: </label>
        </div>
        <div className="card__info-item">
          <Button>Add case</Button>
        </div>

        <div className="card__info-item">
          <label>Được tạo bởi: </label>
          admin
        </div>
        <div className="card__info-item">
          <Button>Lưu bài toán</Button>
        </div>
      </form>
    </div>
  );
};

export default PostCard;
