import Button from 'components/Button';
import React from 'react';

const UpdateContest = (props) => {
  const show = props.show;
  const item = props.item;
  const onClose = props.onClose;
  if (!show) {
    return null;
  }
  return (
    // <div>
    //   {/* <button className="close" onClick={onClose}>
    //     <i className="fa-solid fa-circle-xmark"></i>
    //   </button> */}
    //   <div>{console.log('áddsadsad')}</div>
    // </div>
    <div className="card__modal">
      <div className="card__modal__body">
        <div className="card__modal__body-control">
          <input type="text" name="input" placeholder="Đầu vào" />
        </div>
        <div className="card__modal__body-control">
          <input type="text" name="output" placeholder="Đầu ra" />
        </div>

        <div className="card__modal__body-control">
          <input type="number" name="point" placeholder="Điểm" />
        </div>
        <div className="card__modal__body-control">
          <input type="text" name="time" placeholder="Thời gian" />
        </div>
        <div className="card__modal__body-submit">
          <Button>Lưu</Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateContest;
