import { gql } from '@apollo/client';

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

export { queyUser };
