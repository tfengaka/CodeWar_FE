import React, { useState } from 'react';
import Button from 'components/Button';

const PostCard = () => {
  const [open, setOpen] = useState(false);
  console.log(open);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container-card">
      <div className="card">
        <h4>Tạo bài toán</h4>
        <div className="card__title">
          <label>Tiêu đề: </label>
          <input className="card__title-text"></input>
        </div>
        <div className="card__item">
          <label>Nội dung: </label>
          <textarea rows="10" className="card__item-text" />
        </div>
        <div className="card__item">
          <label>Mức: </label>
          <input className="card__item-text"></input>
        </div>

        <div className="card__item">
          <label>Từ khóa: </label>
          <input className="card__item-text"></input>
        </div>
        <div className="card__item">
          <label>Đầu ra: </label>
        </div>
        <div className="card__item">
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpen(!open);
            }}
          >
            Thêm case:
          </button>
        </div>

        {open && (
          <div className="card__modal">
            <button className="btn__close" onClick={() => setOpen(open)}>
              Đóng
            </button>

            <div className="card__modal__body">
              <div className="card__modal__body-control">
                <input type="text" id="input" placeholder="Đầu vào" />
              </div>
              <div className="card__modal__body-control">
                <input type="text" id="output" placeholder="Đầu ra" />
              </div>

              <div className="card__modal__body-control">
                <input type="text" id="point" placeholder="Điểm" />
              </div>
              <div className="card__modal__body-control">
                <input type="text" id="time" placeholder="Thời gian" />
              </div>
              <div className="card__modal__body-submit">
                <button className="" type="submit">
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="card__item">
          <label>Được tạo bởi: </label>
          admin
        </div>
        <div className="card__item">
          <Button>Lưu bài toán</Button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
