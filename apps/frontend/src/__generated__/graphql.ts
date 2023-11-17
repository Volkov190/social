/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string; }
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type InputMessage = {
  text: Scalars['String']['input'];
  toUserId: Scalars['Int']['input'];
};

export type InputUser = {
  birthdate: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  gender: Gender;
  name: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  fromUserId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  toUserId: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFriend: User;
  addMessage: Message;
  createUser: User;
  deleteFriend: User;
  deleteUser: User;
  editUser: User;
};


export type MutationAddFriendArgs = {
  friendId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};


export type MutationAddMessageArgs = {
  message: InputMessage;
};


export type MutationCreateUserArgs = {
  user: InputUser;
};


export type MutationDeleteFriendArgs = {
  friendId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float']['input'];
};


export type MutationEditUserArgs = {
  id: Scalars['Float']['input'];
  user: InputUser;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  id: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getMessagesTo: Array<Message>;
  posts: Array<Post>;
  users: Array<User>;
};


export type QueryGetMessagesToArgs = {
  userToId: Scalars['Int']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageSended: Message;
};

export type User = {
  __typename?: 'User';
  birthdate: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  friends: Array<User>;
  gender: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type GetMessagesToQueryVariables = Exact<{
  userToIdParam: Scalars['Int']['input'];
}>;


export type GetMessagesToQuery = { __typename?: 'Query', getMessagesTo: Array<{ __typename?: 'Message', id: number, text: string, toUserId: number }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, email: string, name: string, birthdate: string, gender: string }> };

export type DialogUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type DialogUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, name: string }> };

export type AddMessageMutationVariables = Exact<{
  inputMessage: InputMessage;
}>;


export type AddMessageMutation = { __typename?: 'Mutation', addMessage: { __typename?: 'Message', id: number, text: string, fromUserId: number, toUserId: number } };

export type MessageSendedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageSendedSubscription = { __typename?: 'Subscription', messageSended: { __typename?: 'Message', id: number, text: string, fromUserId: number, toUserId: number } };


export const GetMessagesToDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessagesTo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userToIdParam"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMessagesTo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userToId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userToIdParam"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"toUserId"}}]}}]}}]} as unknown as DocumentNode<GetMessagesToQuery, GetMessagesToQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"birthdate"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const DialogUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DialogUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DialogUsersQuery, DialogUsersQueryVariables>;
export const AddMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inputMessage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputMessage"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inputMessage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"fromUserId"}},{"kind":"Field","name":{"kind":"Name","value":"toUserId"}}]}}]}}]} as unknown as DocumentNode<AddMessageMutation, AddMessageMutationVariables>;
export const MessageSendedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MessageSended"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageSended"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"fromUserId"}},{"kind":"Field","name":{"kind":"Name","value":"toUserId"}}]}}]}}]} as unknown as DocumentNode<MessageSendedSubscription, MessageSendedSubscriptionVariables>;