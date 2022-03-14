import React from 'react';
import Avatar from '../../../../assets/avatar_teacher.jpg';
import ImagMergeSort from '../../../../assets/merge_sort.jpg';
function CardList() {
  return (
    <div className="card">
      <img src={ImagMergeSort} alt="" className="card__image" />
      <div className="card__content">
        <div className="card__top">
          <h3 className="card__top__title">Thuật toán sắp xếp trộn</h3>
          <div className="card__top__user">
            <img src={Avatar} alt="" className="card__top__user-avatar" />
            <div className="card__top__user-info">
              <div className="card__top__user-info__top">
                <h4 className="card__top__user-info__name">Trần Thị Dung</h4>
              </div>
              <div className="card__top__user-info__position">Giảng viên</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardList;
