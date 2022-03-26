import React from 'react';
import { Link } from 'react-router-dom';

import LogoUTC from '../../../assets/LogoUTC.png';

export default function ItemContest(props) {
  const options = props.itemProps;

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

  return (
    <div className='panel__body'>
      <ol>
        {options.map((item) => (
          <li key={item.id} className='body__item'>
            <div className='row__flex'>
              <img src={LogoUTC} alt='' className='logo' />
              <div className='content__main'>
                <p className='title'>
                  <Link to={'/contest/' + conversionURL(item.title) + '.' + item.id + '.html'}>
                    {item.title}
                  </Link>
                </p>
                <ul className='detail'>
                  <li>
                    <i className='bx bx-calendar'></i>
                    {item.timeFrom}
                  </li>
                  <li>
                    <i className='bx bx-time'></i> {item.day}
                  </li>
                </ul>
              </div>
              <div className='status'>
                <div className='status__tag'>
                  <i className='bx bxs-circle' style={item}></i> {item.text}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
