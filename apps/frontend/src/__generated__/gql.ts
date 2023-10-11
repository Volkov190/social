/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "#graphql\n  query GetMessagesTo($userToIdParam: Int!) {\n    getMessagesTo(userToId: $userToIdParam) {\n      id\n      text\n      toUserId\n    }\n  }\n": types.GetMessagesToDocument,
    "#graphql\n  query Users {\n    users {\n      id\n      email\n      name\n      birthdate\n      gender\n    }\n  }\n": types.UsersDocument,
    "#graphql\nquery DialogUsers {\n  users {\n    id\n    name\n  }\n}\n": types.DialogUsersDocument,
    "#graphql\n  mutation AddMessage($inputMessage: InputMessage!) {\n    addMessage(message: $inputMessage) {\n        id\n        text\n        fromUserId\n        toUserId\n    }\n  }\n": types.AddMessageDocument,
    "#graphql\n  subscription MessageSended {\n    messageSended {\n        id\n        text\n        fromUserId\n        toUserId\n    }\n  }\n": types.MessageSendedDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "#graphql\n  query GetMessagesTo($userToIdParam: Int!) {\n    getMessagesTo(userToId: $userToIdParam) {\n      id\n      text\n      toUserId\n    }\n  }\n"): (typeof documents)["#graphql\n  query GetMessagesTo($userToIdParam: Int!) {\n    getMessagesTo(userToId: $userToIdParam) {\n      id\n      text\n      toUserId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "#graphql\n  query Users {\n    users {\n      id\n      email\n      name\n      birthdate\n      gender\n    }\n  }\n"): (typeof documents)["#graphql\n  query Users {\n    users {\n      id\n      email\n      name\n      birthdate\n      gender\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "#graphql\nquery DialogUsers {\n  users {\n    id\n    name\n  }\n}\n"): (typeof documents)["#graphql\nquery DialogUsers {\n  users {\n    id\n    name\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "#graphql\n  mutation AddMessage($inputMessage: InputMessage!) {\n    addMessage(message: $inputMessage) {\n        id\n        text\n        fromUserId\n        toUserId\n    }\n  }\n"): (typeof documents)["#graphql\n  mutation AddMessage($inputMessage: InputMessage!) {\n    addMessage(message: $inputMessage) {\n        id\n        text\n        fromUserId\n        toUserId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "#graphql\n  subscription MessageSended {\n    messageSended {\n        id\n        text\n        fromUserId\n        toUserId\n    }\n  }\n"): (typeof documents)["#graphql\n  subscription MessageSended {\n    messageSended {\n        id\n        text\n        fromUserId\n        toUserId\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;