import gql from "graphql-tag";

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

export const GET_DESTINATION_ID = gql`
  query DestinationId($destinationIdId: ID!) {
    destinationId(id: $destinationIdId) {
      id
      name
      description
      imgUrl
      Rooms {
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
  }
`;

export const CREATE_DESTINATION = gql`
  mutation CreateDestination(
    $name: String
    $description: String
    $imgUrl: String
  ) {
    createDestination(name: $name, description: $description, imgUrl: $imgUrl) {
      id
      name
      description
      imgUrl
    }
  }
`;

export const EDIT_DESTINATION = gql`
  mutation EditDestination(
    $editDestinationId: ID
    $name: String
    $description: String
    $imgUrl: String
  ) {
    editDestination(
      id: $editDestinationId
      name: $name
      description: $description
      imgUrl: $imgUrl
    ) {
      id
      name
      description
      imgUrl
    }
  }
`;

export const DELETE_DESTINATON = gql`
  mutation DeleteDestination($deleteDestinationId: ID!) {
    deleteDestination(id: $deleteDestinationId)
  }
`;
