import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_EXERCISE } from 'graphql/Queries';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';
import Button from 'components/Button';

const ListQuestionContest = () => {
  const location = useLocation();
  const pathName = location.pathname;
  let { loading, error, data } = useQuery(GET_ALL_EXERCISE);

  if (loading) return <div className="loading"></div>;
  if (error) return <div>Load data failed</div>;

  const item = data?.exercises
    ?.filter((b) => '/admin/contest/' + b.contestId === pathName)
    .map(({ id, name, level, topic, updatedAt, contestId }) => ({
      id,
      name,
      level,
      topic,
      updatedAt,
      contestId,
    }));

  return (
    <div style={{ padding: '16px' }}>
      <div className="table">
        <div className="container">
          <div className="table_head">
            <div className="table_head_title">
              <span>Danh sách câu hỏi</span>
            </div>
          </div>

          <div className="table_body">
            <div className="table_body_heading">
              <table>
                <colgroup>
                  <col width="30" />
                  <col width="120" />
                  <col width="400" />
                  <col width="150" />
                  <col width="400" />
                  <col width="200" />
                </colgroup>
                <thead>
                  <tr>
                    <th className="table_body_heading_item"></th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>ID</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Tiêu đề</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Độ khó</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Chủ đề</span>
                      </div>
                    </th>
                    <th className="table_body_heading_item">
                      <div className="table_cell">
                        <span>Cập nhật lúc</span>
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="table_body_content">
              <table>
                <colgroup>
                  <col width="30" />
                  <col width="120" />
                  <col width="400" />
                  <col width="150" />
                  <col width="400" />
                  <col width="200" />
                </colgroup>
                <tbody>
                  {item.map((item, index) => (
                    <TableRow key={index} data={item} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table_body_button">
              <Link to={`problems/create`}>
                <Button backgroundColor="blue">
                  <i className="bx bx-plus"></i>Thêm câu hỏi
                </Button>
              </Link>
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
      <td className="table_body_content_item"></td>
      <td className="table_body_content_item">
        <div className="table_cell">{displayID}</div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">{name}</div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <div className={`tag bg-${levelColor}`}>
            <span>{levelName}</span>
          </div>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          {topic.map((item, index) => (
            <div key={index} className="tag topic">
              <span>{item}</span>
            </div>
          ))}
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <span>{moment(updatedAt).format('DD/MM/YYYY - HH:MM:ss')}</span>
        </div>
      </td>
    </tr>
  );
};

export default ListQuestionContest;
