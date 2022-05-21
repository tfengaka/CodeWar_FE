const { gql } = require('@apollo/client');

export const SIGN_IN = gql`
  mutation SIGN_IN($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      access_token
    }
  }
`;
export const SIGN_UP = gql`
  mutation SIGN_UP($email: String!, $password: String!, $display_name: String!) {
    createAccount(data: { email: $email, full_name: $display_name, password: $password, role: "user" }) {
      id
      email
      full_name
      access_token
    }
  }
`;

export const SUBMIT_CODE = gql`
  mutation SUBMIT_CODE(
    $exerciseId: String!
    $caseFailed: jsonb!
    $excuteTime: float8!
    $memory: Int!
    $point: float8!
  ) {
    resultExercise(
      data: {
        caseFailed: $caseFailed
        excuteTime: $excuteTime
        exerciseId: $exerciseId
        memory: $memory
        point: $point
      }
    )
  }
`;

export const UPDATE_CONTEST = gql`
  mutation UPDATE_CONTEST(
    $contestId: String!
    $name: String
    $des: String
    $startDate: timestamptz
    $endDate: timestamptz
    $status: String
    $createdBy: String
  ) {
    update_contests_by_pk(
      pk_columns: { id: $contestId }
      _set: { name: $name, des: $des, endDate: $endDate, startDate: $startDate, status: $status, createdBy: $createdBy }
    ) {
      id
    }
  }
`;

export const INSERT_CONTEST = gql`
  mutation INSERT_CONTEST(
    $name: String!
    $des: String!
    $startDate: timestamptz!
    $endDate: timestamptz!
    $status: String!
    $createdBy: String!
  ) {
    insert_contests_one(
      object: {
        name: $name
        des: $des
        endDate: $endDate
        startDate: $startDate
        status: $status
        createdBy: $createdBy
      }
    ) {
      name
      des
    }
  }
`;

export const INSERT_PROBLEM = gql`
  mutation INSERT_PROBLEM($name: String!, $des: String!, $level: Int!, $topic: jsonb!, $metadata: jsonb!) {
    insert_exercises(objects: { name: $name, des: $des, level: $level, topic: $topic, metadata: $metadata }) {
      returning {
        des
        level
        name
      }
    }
  }
`;

export const UPDATE_PROBLEM = gql`
  mutation UPDATE_PROBLEM(
    $exerciseId: String!
    $name: String
    $des: String
    $level: Int
    $topic: jsonb
    $updatedAt: timestamptz
    $status: String
    $metadata: jsonb
  ) {
    update_exercises_by_pk(
      pk_columns: { id: $exerciseId }
      _set: {
        name: $name
        des: $des
        level: $level
        topic: $topic
        updatedAt: $updatedAt
        status: $status
        metadata: $metadata
      }
    ) {
      id
    }
  }
`;

export const INSERT_COURSE = gql`
  mutation INSERT_COURSE($name: String!, $des: String!, $image: String!, $status: String!, $createdBy: String!) {
    insert_courses(objects: { name: $name, des: $des, image: $image, status: $status }) {
      returning {
        des
        image
        name
        status
      }
    }
  }
`;

export const UPDATE_DISCUSS_REACT = gql`
  mutation UPDATE_DISCUSS_REACT($id: String!, $discussId: String!) {
    discussReactUpdate(data: { id: $id, discussId: $discussId })
  }
`;

export const ADD_DISCUSS = gql`
  mutation ADD_DISCUSS($exerciseId: String!, $content: String!) {
    insert_discusses_one(object: { exerciseId: $exerciseId, content: $content }) {
      accountId
    }
  }
`;

export const APPROVED_NEW_BLOG = gql`
  mutation APPROVED_NEW_BLOG($blogID: String!, $reviewer: String!) {
    update_blogs_by_pk(pk_columns: { id: $blogID }, _set: { isApproved: true, updatedBy: $reviewer }) {
      id
      isApproved
    }
  }
`;
export const REMOVE_BLOG_BY_ID = gql`
  mutation REMOVE_BLOG_BY_ID($blogID: String!) {
    delete_blogs_by_pk(id: $blogID) {
      id
    }
  }
`;
