const { gql } = require('@apollo/client');

const login = gql`
  mutation userLogin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      expires_in
      refresh_token
    }
  }
`;
