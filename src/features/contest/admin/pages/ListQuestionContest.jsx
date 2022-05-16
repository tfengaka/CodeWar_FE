import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_EXERCISE } from 'graphql/Queries';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

const ListQuestionContest = () => {
  const location = useLocation();
  const pathName = location.pathname;
  let { loading, error, data } = useQuery(GET_ALL_EXERCISE);

  if (loading) return <div className="loading"></div>;
  if (error) return <div>Load data failed</div>;

  const item = data?.exercises
    ?.filter((b) => '/admin/contest/contest/' + b.contestId === pathName)
    .map(({ id, name, level, topic, updatedAt }) => ({
      id,
      name,
      level,
      topic,
      updatedAt,
    }));

  return (
    <div className="problem">
      <div className="problem_container">
        <div className="problem_head">
          <div className="problem_head_title">
            <span>Danh Sách Câu Hỏi</span>
          </div>
        </div>

        <div className="problem_option">
          <div className="problem_option_panel"></div>
        </div>

        <div className="problem_content">
          <div className="problem_content_table">
            <div className="problem_content_table_header">
              <table className="table">
                <colgroup>
                  <col width="40" />
                  <col width="120" />
                  <col width="400" />
                  <col width="150" />
                  <col width="450" />
                  <col width="150" />
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
                        <span>Cập nhật lúc</span>
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="problem_content_table_body">
              <table className="table">
                <colgroup>
                  <col width="30" />
                  <col width="120" />
                  <col width="400" />
                  <col width="150" />
                  <col width="450" />
                  <col width="150" />
                </colgroup>
                <tbody className="table_body">
                  {item.map((item, index) => (
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
  const displayID = id.substr(0, 8).toUpperCase();
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
        <div className="table_cell">{displayID}</div>
      </td>
      <td>
        <div className="table_cell">{name}</div>
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
          {topic.map((item, index) => (
            <div key={index} className="tag topic">
              <span>{item}</span>
            </div>
          ))}
        </div>
      </td>
      <td>
        <div className="table_cell">
          <span>{moment(updatedAt).format('DD/MM/YYYY - HH:MM:ss')}</span>
        </div>
      </td>
    </tr>
  );
};

export default ListQuestionContest;
