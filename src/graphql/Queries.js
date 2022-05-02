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

export const getExercises = gql`
  query getExercises {
    exercises {
      id
      level
      name
    }
  }
`;

export const getContests = gql`
  query getContests {
    contests {
      id
      name
      des
      startDate
      endDate
      createdBy
      status
    }
  }
`;
