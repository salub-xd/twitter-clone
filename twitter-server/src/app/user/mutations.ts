export const mutations = `#graphql

createUser(payload:CreateUser!):String

followUser(to:ID!):Boolean
unfollowUser(to:ID!):Boolean

`;