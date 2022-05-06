import React from 'react';

import { useQuery } from '@apollo/client';
import { GET_ALL_EXERCISE } from 'graphql/Queries';
import { Link } from 'react-router-dom';

const Problem = () => {
  let { loading, error, data } = useQuery(GET_ALL_EXERCISE);

  if (loading) return <div className="loading"></div>;
  if (error) return <div>Load data failed</div>;
  return (
    <div className="problem">
      <div className="problem_container">
        <div className="problem_head">
          <div className="problem_head_title">
            <span>Danh sách bài tập</span>
          </div>
        </div>

        <div className="problem_option">
          <div className="problem_option_panel"></div>
        </div>

        <div className="problem_content">
          <div className="problem_content_table">
            <div className="problem_content_table_header">
              <table style={{ width: '100%' }}>
                <colgroup>
                  <col width="50" />
                  <col width="200" />
                  <col width="450" />
                  <col width="150" />
                  <col width="287" />
                  <col width="350" />
                </colgroup>
                <thead>
                  <tr>
                    <th className="table_header">
                      <div className="table_cell">
                        <span> </span>
                      </div>
                    </th>
                    <th className="table_header">
                      <div className="table_cell">
                        <span>ID</span>
                      </div>
                    </th>
                    <th className="table_header">
                      <div className="table_cell">
                        <span>Tiêu đề</span>
                      </div>
                    </th>
                    <th className="table_header">
                      <div className="table_cell">
                        <span>Độ khó</span>
                      </div>
                    </th>
                    <th className="table_header">
                      <div className="table_cell">
                        <span>Chủ đề</span>
                      </div>
                    </th>
                    <th className="table_header">
                      <div className="table_cell">
                        <span>Cập nhật ngày</span>
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="problem_content_table_body">
              <table className="table">
                <colgroup>
                  <col width="50" />
                  <col width="200" />
                  <col width="450" />
                  <col width="150" />
                  <col width="287" />
                  <col width="350" />
                </colgroup>
                <tbody className="table_body">
                  {data?.exercises.map((item, index) => (
                    <TableRow key={index} data={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ data }) => {
  const { id, name, level, topic, updatedAt } = data;
  let levelName = '';
  let levelColor = '';
  switch (level) {
    case 1:
      levelName = 'Dễ';
      levelColor = 'green';
      break;
    case 2:
      levelName = 'Trung bình';
      levelColor = 'blue';
      break;
    case 3:
      levelName = 'Khó';
      levelColor = 'orange';
      break;
    default:
      break;
  }
  return (
    <tr className="table_row">
      <td>
        <div className="table_cell">
          <i className="bx bx-check color-green"></i>
        </div>
      </td>
      <td>
        <div className="table_cell">
          <Link to={`/problem/${id}`} state={{ data }}>
            {data.id}
          </Link>
        </div>
      </td>
      <td>
        <div className="table_cell">
          <Link to={`/problem/${id}`} state={{ data }}>
            {name}
          </Link>
        </div>
      </td>
      <td>
        <div className="table_cell">
          <div className={`tag bg-${levelColor}`}>
            <span>{levelName}</span>
          </div>
        </div>
      </td>
      <td>
        <div className="table_cell">
          <span>{topic}</span>
        </div>
      </td>
      <td>
        <div className="table_cell">
          <span>{updatedAt}</span>
        </div>
      </td>
    </tr>
  );
};

export default Problem;
