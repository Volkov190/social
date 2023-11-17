import { gql } from "@/__generated__";

export const GET_USER_MESSAGES_TO = gql(`#graphql
  query GetMessagesTo($userToIdParam: Int!) {
    getMessagesTo(userToId: $userToIdParam) {
      id
      text
      toUserId
    }
  }
`);
