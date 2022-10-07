import gql from 'graphql-tag';

export const GET_REGISTER = gql`
  mutation Register($username: String, $email: String, $password: String) {
    register(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;
