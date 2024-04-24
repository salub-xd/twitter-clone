import { graphql } from "@/gql";

export const createUserMutation = graphql(`
#graphql

mutation CreateUser($payload: CreateUser!) {
    createUser(payload: $payload)
}

`);

export const followUserMutation = graphql(`
  #graphql
  mutation FollowUser($to: ID!) {
    followUser(to: $to)
  }
`);

export const unfollowUserMutation = graphql(`
  #graphql
  mutation UnfollowUser($to: ID!) {
    unfollowUser(to: $to)
  }
`);