export const queries = `#graphql
    verifyGoogleToken(token: String!): String
    getCurrentUser:User
    
    updateUser(payload:UpdateUser!):String
    loginUser(payload:LoginUser!):String
    getUserByName(username:String!):User

`;