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
  ) {
    update_contests_by_pk(
      pk_columns: { id: $contestId }
      _set: { name: $name, des: $des, endDate: $endDate, startDate: $startDate, status: $status }
    ) {
      id
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
