import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { getContests } from 'graphql/Queries';
import moment from 'moment';
import Button from 'components/Button';
import UpdateContest from './UpdateContest';
import { UPDATE_CONTEST } from 'graphql/Mutation';

const ListContest = () => {
  let { loading, error, data } = useQuery(getContests);

  if (loading) return <div className="loading"></div>;
  if (error) return <div>Load data failed</div>;
  return (
    <div className="contest">
      <div className="contest_container">
        <div className="contest_head">
          <div className="contest_head_title">
            <span>Danh sách cuộc thi</span>
          </div>
        </div>
        <div className="contest_content">
          <div className="contest_content_table">
            <div className="contest_content_table_header">
              <table className="table">
                <colgroup>
                  <col width="120" />
                  <col width="150" />
                  <col width="300" />
                  <col width="250" />
                  <col width="250" />
                  <col width="120" />
                  <col width="150" />
                  <col width="185" />
                </colgroup>
                <thead>
                  <tr>
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
                        <span>Nội dung</span>
                      </div>
                    </th>
                    <th className="table_header">
                      <div className="table_cell">
                        <span>Ngày bắt đầu</span>
                      </div>
                    </th>
                    <th className="table_header">
                      <div className="table_cell">
                        <span>Ngày kết thúc</span>
                      </div>
                    </th>
                    <th className="table_header">
                      <div className="table_cell">
                        <span>Tạo bởi</span>
                      </div>
                    </th>
                    <th className="table_header">
                      <div className="table_cell">
                        <span>Trạng thái</span>
                      </div>
                    </th>
                    <th className="table_header">
                      <div className="table_cell">
                        <span> </span>
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="contest_content_table_body">
              <table className="table">
                <colgroup>
                  <col width="120" />
                  <col width="150" />
                  <col width="300" />
                  <col width="250" />
                  <col width="250" />
                  <col width="120" />
                  <col width="150" />
                  <col width="125" />
                </colgroup>
                <tbody className="table_body">
                  {data?.contests.map((item, index) => (
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
  const { id, name, des, startDate, endDate, createdBy, status } = data;
  const displayID = id.substr(0, 8).toUpperCase();
  const [show, setShow] = useState(false);
  const [contestItem, setItem] = useState();

  const [removeContest] = useMutation(UPDATE_CONTEST);

  const handleListRemove = () => {
    removeContest({
      variables: { contestId: id, status: 'deleted', name, des, startDate, endDate },
      onCompleted: () => {
        alert('Xóa thành công');
      },
      onError: (error) => {
        alert(error.message);
      },
      refetchQueries: [getContests],
    });
  };

  return (
    <tr className="table">
      <td>
        <div className="table_cell">{displayID}</div>
      </td>
      <td>
        <div className="table_cell">{name}</div>
      </td>
      <td>
        <div className="table_cell">{des}</div>
      </td>
      <td>
        <div className="table_cell">
          <span>{moment(startDate).format('DD/MM/YYYY - HH:MM:ss')}</span>
        </div>
      </td>
      <td>
        <div className="table_cell">
          <span>{moment(endDate).format('DD/MM/YYYY - HH:MM:ss')}</span>
        </div>
      </td>
      <td>
        <div className="table_cell">{createdBy}</div>
      </td>
      <td>
        <div className="table_cell">{status}</div>
      </td>
      <td>
        <div className="table_cell tool">
          <Button
            backgroundColor="green"
            onClick={() => {
              setItem(id, name, des, startDate, endDate, createdBy, status);
            }}
          >
            <i className="bx bxs-edit"></i>
          </Button>
          <Button backgroundColor="red" onClick={() => handleListRemove(id)}>
            <i className="bx bxs-trash-alt"></i>
          </Button>
        </div>
      </td>
      <UpdateContest show={show} item={contestItem} onClose={() => setShow(false)} />
    </tr>
  );
};

export default ListContest;
