import React, { useState } from 'react';
import Button from 'components/Button';

const PostCard = () => {
  const [open, setOpen] = useState(0);
  console.log(open);

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
          <button onClick={() => setOpen((p) => p++)}>Thêm case: {open}</button>
        </div>

        {open && (
          <div className="info__item__case-modal">
            {/* <button className="btn_close" onClick={() => setOpen(open)}>
              Đóng
            </button> */}

            <form>
              <div className="modal__body-control">
                <input type="text" id="output" placeholder="Đầu ra" />
              </div>
              <div className="modal__body-control">
                <input type="text" id="input" placeholder="Đầu vào" />
              </div>
              <div className="modal__body-control">
                <input type="text" id="point" placeholder="Điểm" />
              </div>
              <div className="modal__body-control">
                <input type="text" id="time" placeholder="Thời gian" />
              </div>
              <div className="modal__body-submit">
                <button className="" type="submit">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        )}

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
