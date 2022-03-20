const { gql } = require('@apollo/client');

const userLogin = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      access_token
    }
  }
`;

export { userLogin };
