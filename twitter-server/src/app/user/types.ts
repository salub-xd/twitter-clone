export const types = `#graphql

scalar Date

input CreateUser {
    name:String!
    username:String!
    email:String!
    password:String!
}

input LoginUser {
    email:String!
    password:String!
}

type User {
id:ID!
name:String!
username:String
bio:String
email:String!
password:String
profileImage:String
coverImage:String
createdAt:Date!

followers: [User]
following: [User]

recommendedUsers: [User]

tweets:[Tweet]
}

`;