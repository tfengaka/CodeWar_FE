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
    exercises(
      where: { _and: { contestId: { _is_null: true }, challengeId: { _is_null: true }, conceptId: { _is_null: true } } }
    ) {
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

export const GET_CONTEST = gql`
  query GET_CONTEST {
    contests(order_by: { endDate: desc }) {
      id
      name
      des
      startDate
      endDate
      time
      status
      logoUrl
      exercises {
        topic
      }
      account {
        fullName
        avatarUrl
      }
      contest_results_aggregate {
        aggregate {
          count(columns: createdBy, distinct: true)
        }
      }
      contest_results(distinct_on: createdBy) {
        createdBy
      }
    }
  }
`;

export const GET_ALL_DISCUSSES = gql`
  query getAllDiscusses($exerciseId: String!) {
    discusses(where: { exerciseId: { _eq: $exerciseId } }) {
      account {
        fullName
        avatarUrl
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
      des
      image
      createdBy
      createdAt
      account {
        fullName
        avatarUrl
      }
    }
  }
`;

export const GET_ALL_CONCEPT_BY_COURSEID = gql`
  query GET_ALL_CONCEPT_BY_COURSEID($courseId: String!) {
    concepts(where: { courseId: { _eq: $courseId } }) {
      id
      name
      priority
      createdAt
      createdBy
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

export const GET_ALL_EXERCISE_CONTEST = gql`
  query GET_ALL_EXERCISE_CONTEST($contestId: String!) {
    contests_by_pk(id: $contestId) {
      id
      time
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
  }
`;

export const GET_ALL_CHALLENGE = gql`
  query GET_ALL_CHALLENGES {
    challenges {
      id
      image
      name
      priority
      startDate
      endDate
      des
      account {
        fullName
        avatarUrl
      }
      exercises {
        id
        des
        name
        topic
        level
        metadata
        updatedAt
        exercise_results_aggregate {
          aggregate {
            count(columns: id)
          }
        }
      }
    }
  }
`;
