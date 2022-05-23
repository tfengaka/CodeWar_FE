import { useQuery } from '@apollo/client';
import Helmet from 'components/Helmet';
import PageLoading from 'components/PageLoading';
import ServerError from 'components/ServerError';
import { getContests } from 'graphql/Queries';
import { React, useState } from 'react';
import ItemContest from './ItemContest';

const Contest = () => {
  const [search, setSearch] = useState('');

  const { loading, error, data } = useQuery(getContests);
  if (loading) return <PageLoading />;
  if (error) return <ServerError />;

  const items = data?.contests.filter((val) => {
    if (search === '') {
      return val;
    } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  });

  return (
    <Helmet title={'Cuộc thi'}>
      <div className="content">
        <div className="content_container">
          <div className="panel__title">Tất cả cuộc thi</div>
          <div className="panel__extra">
            <ul className="filter">
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
      </div>
    </Helmet>
  );
};

export default Contest;
