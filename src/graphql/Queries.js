import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query GET_USER_INFO($ID: String!) {
    account_by_pk(id: $ID) {
      id
      email
      fullName
      role
    }
  }
`;

export const GET_ALL_EXERCISE = gql`
  query GET_ALL_EXERCISE {
    exercises {
      id
      level
      name
      topic
      input
      output
      des
      updatedAt
    }
  }
`;
