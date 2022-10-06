import gql from 'graphql-tag';

export const GET_DESTINATIONS = gql`
  query GetDestinations {
    destinations {
      id
      name
      description
      imgUrl
    }
  }
`;
