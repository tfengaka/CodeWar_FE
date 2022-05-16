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
      des
      name
      topic
      level
      metadata
      updatedAt
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

export const GET_ALL_DISCUSSES = gql`
  query getAllDiscusses($exerciseId: String!) {
    discusses(where: { exerciseId: { _eq: $exerciseId } }) {
      account {
        fullName
      }
      discuss_reacts_aggregate {
        aggregate {
          count(columns: id)
        }
      }
      discuss_reacts {
        id
        accountId
      }
      id
      exerciseId
      floor
      title
      content
      createdAt
    }
  }
`;
