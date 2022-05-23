import { useQuery } from '@apollo/client';
import PageLoading from 'components/PageLoading';
import ServerError from 'components/ServerError';
import { GET_ALL_CHALLENGE } from 'graphql/Queries';
import React from 'react';
import background from '../../../assets/images/background.png';

const ChallengesList = () => {
  const { data, loading, error } = useQuery(GET_ALL_CHALLENGE);
  console.log(data);
  if (loading) return <PageLoading />;
  if (error) return <ServerError />;

  return (
    <div className="challenge">
      <center>
        <h1>Danh sách các thử thách</h1>
      </center>
      <div className="challenge_container">
        {data.challenges.map((challenge, index) => (
          <div className="challenge_card" key={index}>
            <img src={background} alt="" />
            <div className="challenge_card-content">
              <div className="challenge_card-content_logo">
                <img src={challenge.image} alt="" />
              </div>
              <div className="challenge_card-content_detail">
                <h1>{challenge.name}</h1>
                <p>{challenge.des}</p>
              </div>
              <div className="challenge_card-content_user">
                <img src={challenge.account.avatarUrl} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengesList;
