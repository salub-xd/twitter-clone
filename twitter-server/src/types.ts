export type JWTUser = {
    id: string;
    email: string;
}

export type GraphqlContext = {
    user?: JWTUser;
}