export const queries = `#graphql
    verifyGoogleToken(token: String!): String
    getCurrentUser:User
    
    loginUser(payload:LoginUser!):String
    getUserByName(username:String!):User
`;