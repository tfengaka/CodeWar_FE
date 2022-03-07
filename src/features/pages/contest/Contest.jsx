import { useState } from 'react';

import ItemContest from './ItemContest';

export default function Contest() {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('Trạng thái');
  const options = ['Đang diễn ra', 'Đã kết thúc'];
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
                <i class="bx bxs-down-arrow"></i>
              </div>
              {isActive && (
                <div className="dropdown__content">
                  <div
                    className="dropdown__content__item"
                    onClick={(e) => {
                      setSelected('Trạng thái');
                      setIsActive(false);
                    }}
                  >
                    Tất cả
                  </div>
                  {options.map((option) => (
                    <div
                      className="dropdown__content__item"
                      onClick={(e) => {
                        setSelected(option);
                        setIsActive(false);
                      }}
                    >
                      {option}
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
              <i class="bx bx-search-alt-2"></i>
            </div>
          </li>
        </ul>
      </div>
      <ItemContest />
    </div>
  );
}
