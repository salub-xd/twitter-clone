import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(`
#graphql

query GetAllTweets {
    getAllTweets {
        id
        title
        image
        createdAt
        updatedAt
        user {
          name
          username
          profileImage
          bio
          followers {
            id
            profileImage
            username
            name
          }
          following {
            id
            profileImage
            username
            name
          }
        }
}
}

`);

export const getOneTweetQuery = graphql(`
#graphql

query GetOneTweet($payload: GetOneTweet!) {
  getOneTweet(payload: $payload) {
    id
        title
        image
        createdAt
        updatedAt
        user {
          name
          username
          profileImage
          bio
        }
}
}

`);

