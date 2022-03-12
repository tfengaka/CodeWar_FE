import { useState } from 'react';

import ItemContest from './ItemContest';

export default function Contest() {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('Trạng thái');
  const itemContest = [
    {
      id: 1,
      content: 'Nội dung',
      time: 'Ngày giờ tổ chức',
      day: 'Số ngày diễn ra',
      text: 'Đang diễn ra',
      color: '#00dd55',
    },
    {
      id: 2,
      content: 'Nội dung',
      time: 'Ngày giờ tổ chức',
      day: 'Số ngày diễn ra',
      text: 'Đã kết thúc',
      color: '#ed4014',
    },
  ];
  const options = [
    { id: 0, value: 'all', text: 'Tất cả' },
    { id: 1, value: 'happen', text: 'Đang diễn ra' },
    { id: 2, value: 'finish', text: 'Đã kết thúc' },
  ];

  return (
    <div className="content">
      <div className="panel__title">Tất cả cuộc thi</div>
      <div className="panel__extra">
        <ul className="filter">
          <li>
            <div
              className="dropdown"
              onMouseEnter={(e) => setIsActive(!isActive)}
              onMouseLeave={(e) => setIsActive(false)}
            >
              <div className="dropdown__btn">
                <span>{selected}</span>
                <i className="bx bxs-down-arrow"></i>
              </div>
              {isActive && (
                <div className="dropdown__content">
                  {options.map((item) => (
                    <div
                      key={item.id}
                      className="dropdown__content__item"
                      onClick={() => {
                        if (item.id === 0) {
                          setSelected('Trạng thái');
                          setIsActive(false);
                        } else {
                          setSelected(item.text);
                          setIsActive(false);
                        }
                      }}
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </li>
          <li>
            <div className="input__wrapper">
              <input
                autoComplete="off"
                spellCheck="false"
                type="text"
                placeholder="Từ khóa"
              ></input>
              <i className="bx bx-search-alt-2"></i>
            </div>
          </li>
        </ul>
      </div>
      <ItemContest itemProps={itemContest} />
    </div>
  );
}
