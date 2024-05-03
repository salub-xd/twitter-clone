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
    "\n#graphql\n\nmutation CreateTweet($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n        id\n\n    }\n}\n\n": types.CreateTweetDocument,
    "\n#graphql\n\nmutation CreateUser($payload: CreateUser!) {\n    createUser(payload: $payload)\n}\n\n": types.CreateUserDocument,
    "\n  #graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n": types.FollowUserDocument,
    "\n  #graphql\n  mutation UnfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n": types.UnfollowUserDocument,
    "\n#graphql\n\nquery GetAllTweets {\n    getAllTweets {\n        id\n        title\n        image\n        createdAt\n        updatedAt\n        user {\n          name\n          username\n          profileImage\n          bio\n          followers {\n            id\n            profileImage\n            username\n            name\n          }\n          following {\n            id\n            profileImage\n            username\n            name\n          }\n        }\n}\n}\n\n": types.GetAllTweetsDocument,
    "\n#graphql\n\nquery GetOneTweet($payload: GetOneTweet!) {\n  getOneTweet(payload: $payload) {\n    id\n        title\n        image\n        createdAt\n        updatedAt\n        user {\n          name\n          username\n          profileImage\n          bio\n        }\n}\n}\n\n": types.GetOneTweetDocument,
    "\n#graphql\n    query VerifyUserGoogleToken($token:String!){\n     verifyGoogleToken(token:$token)\n    }\n ": types.VerifyUserGoogleTokenDocument,
    "\n#graphql\n    query GetCurrentUser {\n     getCurrentUser {\n      id\n      email\n      name\n      username\n      profileImage\n      coverImage\n      bio\n      isOAuth\n      recommendedUsers {\n        id\n        name\n        username\n        profileImage\n      }\n      followers {\n        id\n        name\n        username\n        profileImage\n      }\n      following {\n        id\n        name\n        username\n        profileImage\n      }\n    }\n    }\n ": types.GetCurrentUserDocument,
    "\n#graphql\n\nquery GetUserByName($username: String!) {\n getUserByName(username: $username) {\n  id\n  name\n  username\n  bio\n  createdAt\n  profileImage\n  coverImage\n  followers {\n    id\n    name\n    username\n    profileImage\n  }\n  following {\n    id\n    name\n    username\n    profileImage\n  }\n  tweets {\n    id\n    title\n    image\n    createdAt\n    user {\n      id\n      bio\n      profileImage\n      name\n      username\n    }\n  }\n }\n}\n ": types.GetUserByNameDocument,
    "\n#graphql\n\nquery LoginUser($payload: LoginUser!) {\n  loginUser(payload: $payload)\n}\n\n": types.LoginUserDocument,
    "\n#graphql\n\nquery Query($payload: UpdateUser!) {\n  updateUser(payload: $payload)\n}\n\n": types.QueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n#graphql\n\nmutation CreateTweet($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n        id\n\n    }\n}\n\n"): (typeof documents)["\n#graphql\n\nmutation CreateTweet($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n        id\n\n    }\n}\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n#graphql\n\nmutation CreateUser($payload: CreateUser!) {\n    createUser(payload: $payload)\n}\n\n"): (typeof documents)["\n#graphql\n\nmutation CreateUser($payload: CreateUser!) {\n    createUser(payload: $payload)\n}\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation UnfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UnfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n#graphql\n\nquery GetAllTweets {\n    getAllTweets {\n        id\n        title\n        image\n        createdAt\n        updatedAt\n        user {\n          name\n          username\n          profileImage\n          bio\n          followers {\n            id\n            profileImage\n            username\n            name\n          }\n          following {\n            id\n            profileImage\n            username\n            name\n          }\n        }\n}\n}\n\n"): (typeof documents)["\n#graphql\n\nquery GetAllTweets {\n    getAllTweets {\n        id\n        title\n        image\n        createdAt\n        updatedAt\n        user {\n          name\n          username\n          profileImage\n          bio\n          followers {\n            id\n            profileImage\n            username\n            name\n          }\n          following {\n            id\n            profileImage\n            username\n            name\n          }\n        }\n}\n}\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n#graphql\n\nquery GetOneTweet($payload: GetOneTweet!) {\n  getOneTweet(payload: $payload) {\n    id\n        title\n        image\n        createdAt\n        updatedAt\n        user {\n          name\n          username\n          profileImage\n          bio\n        }\n}\n}\n\n"): (typeof documents)["\n#graphql\n\nquery GetOneTweet($payload: GetOneTweet!) {\n  getOneTweet(payload: $payload) {\n    id\n        title\n        image\n        createdAt\n        updatedAt\n        user {\n          name\n          username\n          profileImage\n          bio\n        }\n}\n}\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n#graphql\n    query VerifyUserGoogleToken($token:String!){\n     verifyGoogleToken(token:$token)\n    }\n "): (typeof documents)["\n#graphql\n    query VerifyUserGoogleToken($token:String!){\n     verifyGoogleToken(token:$token)\n    }\n "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n#graphql\n    query GetCurrentUser {\n     getCurrentUser {\n      id\n      email\n      name\n      username\n      profileImage\n      coverImage\n      bio\n      isOAuth\n      recommendedUsers {\n        id\n        name\n        username\n        profileImage\n      }\n      followers {\n        id\n        name\n        username\n        profileImage\n      }\n      following {\n        id\n        name\n        username\n        profileImage\n      }\n    }\n    }\n "): (typeof documents)["\n#graphql\n    query GetCurrentUser {\n     getCurrentUser {\n      id\n      email\n      name\n      username\n      profileImage\n      coverImage\n      bio\n      isOAuth\n      recommendedUsers {\n        id\n        name\n        username\n        profileImage\n      }\n      followers {\n        id\n        name\n        username\n        profileImage\n      }\n      following {\n        id\n        name\n        username\n        profileImage\n      }\n    }\n    }\n "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n#graphql\n\nquery GetUserByName($username: String!) {\n getUserByName(username: $username) {\n  id\n  name\n  username\n  bio\n  createdAt\n  profileImage\n  coverImage\n  followers {\n    id\n    name\n    username\n    profileImage\n  }\n  following {\n    id\n    name\n    username\n    profileImage\n  }\n  tweets {\n    id\n    title\n    image\n    createdAt\n    user {\n      id\n      bio\n      profileImage\n      name\n      username\n    }\n  }\n }\n}\n "): (typeof documents)["\n#graphql\n\nquery GetUserByName($username: String!) {\n getUserByName(username: $username) {\n  id\n  name\n  username\n  bio\n  createdAt\n  profileImage\n  coverImage\n  followers {\n    id\n    name\n    username\n    profileImage\n  }\n  following {\n    id\n    name\n    username\n    profileImage\n  }\n  tweets {\n    id\n    title\n    image\n    createdAt\n    user {\n      id\n      bio\n      profileImage\n      name\n      username\n    }\n  }\n }\n}\n "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n#graphql\n\nquery LoginUser($payload: LoginUser!) {\n  loginUser(payload: $payload)\n}\n\n"): (typeof documents)["\n#graphql\n\nquery LoginUser($payload: LoginUser!) {\n  loginUser(payload: $payload)\n}\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n#graphql\n\nquery Query($payload: UpdateUser!) {\n  updateUser(payload: $payload)\n}\n\n"): (typeof documents)["\n#graphql\n\nquery Query($payload: UpdateUser!) {\n  updateUser(payload: $payload)\n}\n\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;