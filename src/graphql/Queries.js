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

const getExercises = gql`
  query getExercises {
    exercises {
      id
      level
      name
    }
  }
`;

export { GET_USER_INFO, getExercises };
