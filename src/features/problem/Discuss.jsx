import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_DISCUSS_REACT } from 'graphql/Mutation';
import { GET_ALL_DISCUSSES } from 'graphql/Queries';
import { useAuth } from 'hooks/useAuth';
import moment from 'moment';
import React from 'react';

const Discuss = ({ exerciseId }) => {
  const auth = useAuth();
  const { loading, error, data } = useQuery(GET_ALL_DISCUSSES, { variables: { exerciseId } });
  const [updateDiscussReact] = useMutation(UPDATE_DISCUSS_REACT);

  if (loading) return <div className="loading"></div>;
  if (error) return <div>Load data failed</div>;

  // console.log('discuss:', data);

  const handleReact = (discussId, discussReactId = '') => {
    updateDiscussReact({
      variables: {
        discussId,
        id: discussReactId,
      },
      onError: (err) => {
        console.log(err.message);
      },
      refetchQueries: [GET_ALL_DISCUSSES, { variables: { exerciseId } }],
    });
  };
  return (
    <div className="discuss_container">
      <center>
        <h2>Hỏi Đáp</h2>
      </center>
      <div className="discuss">
        {data.discusses.map((discuss, index) => (
          <div className="discuss_body" key={index}>
            <div className="discuss_body-avatar">
              <i className="bx bx-user bx-lg"></i>
            </div>
            <div className="discuss_body-item">
              <div className="discuss_body-item_header">
                <h3>{discuss.account.fullName}</h3>
                <p>{discuss.content}</p>
              </div>
              <div className="discuss_body-item_footer">
                <p>{moment(discuss.createdAt).format('DD/MM/YYYY - HH:MM:ss')}</p>
                <div className="react">
                  <i
                    className="bx bxs-like bx-md"
                    onClick={() =>
                      handleReact(
                        discuss.id,
                        discuss.discuss_reacts.find((react) => react.accountId === auth.user.id)?.id,
                      )
                    }
                    style={
                      discuss.discuss_reacts.find((reacted) => reacted.accountId === auth.user?.id)
                        ? { color: '#4292FF' }
                        : null
                    }
                  ></i>
                  <p>{discuss.discuss_reacts_aggregate.aggregate.count || 0}</p>
                  <p>Phản hồi</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="discuss_comment"></div>
    </div>
  );
};

export default Discuss;
