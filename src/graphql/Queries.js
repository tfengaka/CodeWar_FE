import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query GET_USER_INFO($ID: String!) {
    account_by_pk(id: $ID) {
      id
      email
      fullName
      avatarUrl
      role
    }
  }
`;

export const GET_ALL_EXERCISE = gql`
  query GET_ALL_EXERCISE {
    exercises(where: { conceptId: { _is_null: true } }) {
      id
      des
      name
      topic
      level
      metadata
      updatedAt
      contestId
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

export const GET_ALL_COURSE = gql`
  query GET_ALL_COURSE {
    courses {
      id
      name
      image
      des
      createdBy
      createdAt
      account {
        fullName
      }
    }
  }
`;

export const GET_ALL_BLOG = gql`
  query GET_ALL_BLOGS {
    blogs(order_by: { isApproved: desc }) {
      id
      title
      content
      isApproved
      createdAt
      updatedBy
      account {
        id
        fullName
      }
    }
  }
`;
export const GET_BLOG_BY_ID = gql`
  query GET_BLOG_BY_ID($blogID: String!) {
    blogs_by_pk(id: $blogID) {
      id
      title
      content
      isApproved
      createdAt
      updatedAt
      account {
        id
        fullName
        blogs(where: { _not: { id: { _eq: $blogID } } }) {
          id
          title
        }
      }
    }
  }
`;

export const GET_ALL_CONCEPT_IN_COURSE = gql`
  query GET_ALL_CONCEPT_IN_COURSE($courseId: String!) {
    concepts(where: { courseId: { _eq: $courseId } }, order_by: { priority: asc }) {
      id
      name
      priority
      status
      exercises {
        id
        des
        name
        topic
        level
        metadata
        updatedAt
        contestId
      }
    }
  }
`;
