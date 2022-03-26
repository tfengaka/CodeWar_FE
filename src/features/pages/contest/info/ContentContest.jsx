import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Data from '../data/Data.json';

export default function ContentContest() {
  const location = useLocation();
  const pathName = location.pathname;
  function conversionURL(str) {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
  }

  const itemStart = Data.filter(
    (b) =>
      '/contest/' + conversionURL(b.title) + '.' + b.id + '.html' === pathName &&
      b.text === 'Đang diễn ra'
  ).map(({ id, title, content, timeFrom, timeEnd, day, creator, text, color }) => ({
    id,
    title,
    content,
    timeFrom,
    timeEnd,
    day,
    creator,
    text,
    color,
  }));

  const itemEnd = Data.filter(
    (b) =>
      '/contest/' + conversionURL(b.title) + '.' + b.id + '.html' === pathName &&
      b.text === 'Đã kết thúc'
  ).map(({ id, title, content, timeFrom, timeEnd, day, creator, text, color }) => ({
    id,
    title,
    content,
    timeFrom,
    timeEnd,
    day,
    creator,
    text,
    color,
  }));

  return (
    <div className='content__container'>
      {itemStart.map((value) => (
        <div key={value.id} className='content__description'>
          <div className='content__card'>
            <div className='content__card--head'>{value.title}</div>
            <div className='content__card--extra'>
              <i className='bx bxs-circle' style={value}></i> {value.text}
            </div>
            <div className='content__card--body'>{value.content}</div>
            {/* <Link to={'/contest'}> */}
            <button className='content__card--button'>Làm bài</button>
            {/* </Link> */}
          </div>
          <div className='content__table'>
            <div className='content__table--item'> Bắt đầu</div>
            <div className='content__table--item'> Kết thúc</div>
            <div className='content__table--item'> Số ngày diễn ra</div>
            <div className='content__table--item'> Người tạo</div>
            <div>{value.timeFrom}</div>
            <div>{value.timeEnd}</div>
            <div>{value.day}</div>
            <div>{value.creator}</div>
          </div>
        </div>
      ))}

      {itemEnd.map((value) => (
        <div key={value.id} className='content__description'>
          <div className='content__card'>
            <div className='content__card--head'>{value.title}</div>
            <div className='content__card--extra'>
              <i className='bx bxs-circle' style={value}></i> {value.text}
            </div>
            <div className='content__card--body'>{value.content}</div>
          </div>
          <div className='content__table'>
            <div className='content__table--item'> Bắt đầu</div>
            <div className='content__table--item'> Kết thúc</div>
            <div className='content__table--item'> Số ngày diễn ra</div>
            <div className='content__table--item'> Người tạo</div>
            <div>{value.timeFrom}</div>
            <div>{value.timeEnd}</div>
            <div>{value.day}</div>
            <div>{value.creator}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
