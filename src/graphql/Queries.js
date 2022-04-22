import { gql } from '@apollo/client';

const GET_USER_INFO = gql`
  query GET_USER_INFO($ID: String!) {
    account_by_pk(id: $ID) {
      id
      email
      fullName
      role
    }
  }
`;

export { GET_USER_INFO };

const queyUser = gql`
  query Account($userID: String!) {
    account(where: { id: { _eq: $userID } }) {
      id
      email
      fullName
      created_at
      role
    }
  }
`;

const getExercises = gql`
  query getExercises($ID: String!) {
    exercises(where: { id: { _eq: $ID } }) {
      id
      name
      level
    }
  }
`;

export { queyUser, getExercises };
