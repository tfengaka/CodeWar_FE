import { useState } from 'react';

import ItemContest from './ItemContest';

export default function Contest() {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('Trạng thái');
  const options = [
    { key: 'all', value: 'all', text: 'Tất cả' },
    { key: 'happen', value: 'happen', text: 'Đang diễn ra' },
    { key: 'finish', value: 'finish', text: 'Đã kết thúc' },
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
                  {options.map((item, index) => (
                    <div
                      key={index}
                      className="dropdown__content__item"
                      onClick={() => {
                        if (index === 0) {
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
      <ItemContest />
    </div>
  );
}
