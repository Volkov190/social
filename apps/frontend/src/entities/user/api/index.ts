import { gql } from "@/__generated__";

export const GET_ALL_USERS = gql(`#graphql
  query Users {
    users {
      id
      email
      name
      birthdate
      gender
    }
  }
`);



export const GET_DIALOG_USERS = gql(`#graphql
query DialogUsers {
  users {
    id
    name
  }
}
`);
