import { graphql } from '../../gql'

export const verifyUserGoogleTokenQuery = graphql(`
#graphql
    query VerifyUserGoogleToken($token:String!){
     verifyGoogleToken(token:$token)
    }
 `);

export const getCurrentUserQuery = graphql(`
#graphql
    query GetCurrentUser {
     getCurrentUser {
      id
      email
      name
      username
      profileImage
      coverImage
      bio
      isOAuth
      recommendedUsers {
        id
        name
        username
        profileImage
      }
      followers {
        id
        name
        username
        profileImage
      }
      following {
        id
        name
        username
        profileImage
      }
    }
    }
 `);

export const getUserByNameQuery = graphql(`
#graphql

query GetUserByName($username: String!) {
 getUserByName(username: $username) {
  id
  name
  username
  bio
  createdAt
  profileImage
  coverImage
  followers {
    id
    name
    username
    profileImage
  }
  following {
    id
    name
    username
    profileImage
  }
  tweets {
    id
    title
    image
    createdAt
    user {
      id
      bio
      profileImage
      name
      username
    }
  }
 }
}
 `);

export const getLoginUserQuery = graphql(`
#graphql

query LoginUser($payload: LoginUser!) {
  loginUser(payload: $payload)
}

`);

export const getUpdateUserQuery = graphql(`
#graphql

query Query($payload: UpdateUser!) {
  updateUser(payload: $payload)
}

`);

