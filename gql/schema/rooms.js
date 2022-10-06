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
      Destination {
        id
        name
        description
        imgUrl
      }
    }
  }
`;


export const SET_ROOM = gql`
mutation CreateRoom($price: Int, $accountNumber: Int, $accountName: String, $maxParticipant: Int, $minParticipant: Int, $schedule: String, $dropPoint: String, $duration: Int, $destinationId: ID) {
  createRoom(price: $price, accountNumber: $accountNumber, accountName: $accountName, maxParticipant: $maxParticipant, minParticipant: $minParticipant, schedule: $schedule, dropPoint: $dropPoint, duration: $duration, DestinationId: $destinationId) {
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
    Destination {
      id
      name
      description
      imgUrl
    }
  }
}
`;
