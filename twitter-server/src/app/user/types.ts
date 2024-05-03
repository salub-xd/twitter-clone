export const types = `#graphql

scalar Date

input UpdateUser {
    name:String!
    username:String!
    email:String!
    password:String
    newPassword:String
    bio:String
    coverImage:String
    profileImage:String
}

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
isOAuth:Boolean

followers: [User]
following: [User]

recommendedUsers: [User]

tweets:[Tweet]
}

`;