import { useMutation, useQuery } from '@apollo/client';
import Button from 'components/Button';
import PageLoading from 'components/PageLoading';
import { APPROVED_NEW_BLOG } from 'graphql/Mutation';
import { GET_ALL_BLOG } from 'graphql/Queries';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { generateSubStr } from 'utils';
const ListBlog = () => {
  const { loading, error, data } = useQuery(GET_ALL_BLOG);

  if (loading) return <PageLoading />;
  if (error) {
    alert(error.message);
    return;
  }
  return (
    <div className="table">
      <div className="container">
        <div className="table_head">
          <div className="table_head_title">
            <span>Danh sách bài viết</span>
          </div>
        </div>
        <div className="table_body">
          <div className="table_body_heading">
            <table>
              <colgroup>
                <col width="15" />
                <col width="90" />
                <col width="400" />
                <col width="220" />
                <col width="100" />
                <col width="150" />
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
                      <span>Tác giả</span>
                    </div>
                  </th>
                  <th className="table_body_heading_item">
                    <div className="table_cell">
                      <span>Trạng thái</span>
                    </div>
                  </th>
                  <th className="table_body_heading_item">
                    <div className="table_cell">
                      <span>Ngày đăng tải</span>
                    </div>
                  </th>
                  <th className="table_body_heading_item">
                    <div className="table_cell">
                      <span>Thao Tác</span>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="table_body_content">
            <table>
              <colgroup>
                <col width="15" />
                <col width="90" />
                <col width="400" />
                <col width="220" />
                <col width="100" />
                <col width="150" />
                <col width="200" />
              </colgroup>
              <tbody>{data && data.blogs.map((blog, index) => <Row key={index} {...blog} />)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListBlog;

const Row = ({ id, title, account, isApproved, createdAt }) => {
  const [confirmBlog] = useMutation(APPROVED_NEW_BLOG, {
    variables: { blogID: id },
    onCompleted: () => {
      alert('Đã duyệt bài viết');
    },
    onError: (error) => {
      alert(error.message);
    },
    refetchQueries: [GET_ALL_BLOG],
  });
  return (
    <tr className="table_row">
      <td className="table_body_content_item"></td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <Link to={`/admin/blog/${generateSubStr(id, 8)}`} state={{ id }}>
            <span>{`${generateSubStr(id, 9)}...`}</span>
          </Link>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <Link to={`/admin/blog/${generateSubStr(id, 8)}`} state={{ id }}>
            {title?.length > 200 ? <span>{`${generateSubStr(title, 300)}...`}</span> : <span>{title}</span>}
          </Link>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <span>{account.fullName}</span>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <div className={`tag bg-${isApproved ? 'green' : 'orange'}`}>
            <span>{`${isApproved ? 'Đã duyệt' : 'Chờ duyệt'}`}</span>
          </div>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">
          <span>{moment(createdAt).format('DD/MM/YYYY - hh:mm:ss')}</span>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell actions">
          {!isApproved && (
            <Button backgroundColor="green" onClick={confirmBlog}>
              <i className="bx bx-check-circle"></i>
              <span>Duyệt</span>
            </Button>
          )}
          <Link to="">
            <Button backgroundColor="blue">
              <i className="bx bxs-edit"></i>
              <span>Sửa</span>
            </Button>
          </Link>
          <Button backgroundColor="red">
            <i className="bx bxs-trash"></i>
            <span>Gỡ</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};
