export const types = `#graphql
  scalar Date

  input CreateTweetData {
    title:String
    image:String
  }

  input GetOneTweet {
    username:String!
    tweetId:String!
  }

  type Tweet {
    id:ID!
    title:String
    image:String
    createdAt:Date!
    updatedAt:Date!

    user:User
  }

`;