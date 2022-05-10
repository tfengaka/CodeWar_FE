import React, { useState } from 'react';
import Button from 'components/Button';

const PostCard = () => {
  const [open, setOpen] = useState(0);
  console.log(open);

  return (
    <div className="card ">
      <form>
        <h4>Tạo bài toán</h4>
        <div className="card__item">
          <label>Tiêu đề: </label>
          <input className="card__item-text"></input>
        </div>
        <div className="form__item">
          <label>Nội dung: </label>
          <textarea rows="10" className="card__item-text" />
        </div>
        <div className="form__item">
          <label>Mức: </label>
          <input className="card__item-text"></input>
        </div>

        <div className="form__item">
          <label>Từ khóa: </label>
          <input className="card__item-text"></input>
        </div>
        <div className="form__item">
          <label>Đầu ra: </label>
        </div>
        <div className="form__item">
          <button onClick={() => setOpen((p) => p++)}>Thêm case: {open}</button>
        </div>

        {open && (
          <div className="form__modal">
            <button className="btn_close" onClick={() => setOpen(open)}>
              Đóng
            </button>

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

        <div className="form__item">
          <label>Được tạo bởi: </label>
          admin
        </div>
        <div className="form__item">
          <Button>Lưu bài toán</Button>
        </div>
      </form>
    </div>
  );
};

export default PostCard;
