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
    $excuteTime: float8!
    $memory: Int!
    $point: float8!
    $caseFailed: jsonb!
  ) {
    insert_pratice_results(
      objects: {
        exerciseId: $exerciseId
        excuteTime: $excuteTime
        memory: $memory
        point: $point
        caseFailed: $caseFailed
      }
    ) {
      affected_rows
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
