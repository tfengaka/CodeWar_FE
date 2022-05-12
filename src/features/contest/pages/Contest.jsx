import { React, useState } from 'react';
import { useQuery } from '@apollo/client';
import { getContests } from 'graphql/Queries';

import ItemContest from '../components/ItemContest';

const options = [
  { id: 0, value: 'all', text: 'Tất cả' },
  { id: 1, value: 'happen', text: 'Đang diễn ra' },
  { id: 2, value: 'finish', text: 'Đã kết thúc' },
];

const Contest = () => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('Trạng thái');
  const [search, setSearch] = useState('');

  const { loading, error, data } = useQuery(getContests);
  if (loading) return <div className="loading"></div>;
  if (error) return <div>Load data failed</div>;

  const items = data?.contests
    .filter((val) => {
      if (search === '') {
        return val;
      } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
        return val;
      }
    })
    .filter((val) => {
      if (selected === 'Trạng thái') {
        return val;
      } else if (val.status.toLowerCase().includes(selected.toLowerCase())) {
        return val;
      }
    })
    .map(({ id, name, des, startDate, endDate, status }) => ({
      id,
      name,
      des,
      startDate,
      endDate,
      status,
    }));

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
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Từ khóa"
              ></input>
              <i className="bx bx-search-alt-2"></i>
            </div>
          </li>
        </ul>
      </div>
      <ItemContest itemProps={items} />
    </div>
  );
};

export default Contest;
