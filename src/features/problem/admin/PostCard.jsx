import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/Button';

const PostCard = () => {
  return (
    <div className='card '>
      <h4>Tạo bài toán</h4>
      <form className='card__info'>
        <div className='card__info-item'>
          <label>Tiêu đề: </label>
          <input className='card__info__text'></input>
        </div>
        <div className='card__info-item'>
          <label>Nội dung: </label>
          <input className='card__info__text'></input>
        </div>
        <div className='card__info-item'>
          <label>Mức: </label>
          <input className='card__info__text'></input>
        </div>
        <div className='card__info-item'>
          <label>Đầu ra: </label>
          <input className='card__info__text'></input>
        </div>
        <div className='card__info-item'>
          <label>Đầu vào: </label>
          <input className='card__info__text'></input>
        </div>
        <div className='card__info-item'>
          <label>Từ khóa: </label>
          <input className='card__info__text'></input>
        </div>
        <div className='card__info-item'>
          <label>Trạng thái: </label>
          <input className='card__info__text'></input>
        </div>
        <div className='card__info-item'>
          <label>Ngày tạo: </label>
          <input className='card__info__text'></input>
        </div>
        <div className='card__info-item'>
          <label>Được tạo bởi: </label>
          admin
        </div>
        <Button>Lưu bài toán</Button>
      </form>
    </div>
  );
};

export default PostCard;
