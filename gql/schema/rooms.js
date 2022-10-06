import gql from 'graphql-tag';

export const GET_ROOMS = gql`
  query GetRooms {
    rooms {
      id
      price
      accountNumber
      accountName
      maxParticipant
      minParticipant
      schedule
      dropPoint
      duration
      UserId
      DestinationId
    }
  }
`;
