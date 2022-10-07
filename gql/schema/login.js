import gql from 'graphql-tag';

export const GET_LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      access_token
    }
  }
`;
