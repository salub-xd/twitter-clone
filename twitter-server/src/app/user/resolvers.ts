import axios from "axios";
import { prismaClient } from "../../clients/db";
import JWTService from "../../services/jwt";
import { GraphqlContext } from "../../types";
import { Prisma, User } from "@prisma/client";
import { generateUsername, getUserByUsername } from "../../services/username-generator";
import bcrypt from 'bcrypt';
import UserService from "../../services/user";
import { redisClient } from "../../clients/redis";

interface GoogleTokenResult {
    iss?: string;
    nbf?: string;
    aud?: string;
    sub?: string;
    email: string;
    email_verified: string;
    azp?: string;
    name?: string;
    picture?: string;
    given_name: string;
    family_name?: string;
    iat?: string;
    exp?: string;
    jti?: string;
    alg?: string;
    kid?: string;
    typ?: string;
}

interface CreateUser {
    name: string;
    username: string;
    email: string;
    password: string;
}

interface LoginUser {
    email: string;
    password: string;
}

interface UpdateUser {
    name: string;
    username: string | undefined;
    email: string;
    password?: string;
    newPassword?: string;
    bio?:  string | undefined;
    coverImage?:  string | undefined;
    profileImage?: string | undefined;
}

const queries = {

    verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
        const jwtToken = await UserService.verifyGoogleAuthToken(token);
        return jwtToken;
    },
    loginUser: async (parent: any, { payload }: { payload: LoginUser }) => {
        const jwtToken = await UserService.loginUser({ ...payload })
        return jwtToken;
    },
    updateUser: async (parent: any, { payload }: { payload: UpdateUser }, ctx: GraphqlContext) => {
        const id = ctx.user?.id;
        if (!id) return null;
        const jwtToken = await UserService.updateUser({ id, ...payload });
        return jwtToken;

    },
    getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
        // console.log(ctx.user);

        const id = ctx.user?.id;
        if (!id) return null;

        const user = await UserService.getUserById(id);
        return user;
    },
    getUserByName: async (parent: any, { username }: { username: string }) => {

        const user = await UserService.getUserByUsername(username);
        return user;

    }
};

const mutations = {
    createUser: async (parent: any, { payload }: { payload: CreateUser }) => {

        const userToken = await UserService.createUser(payload)
        return userToken;

    },

    followUser: async (
        parent: any,
        { to }: { to: string },
        ctx: GraphqlContext
    ) => {
        if (!ctx.user || !ctx.user.id) throw new Error("unauthenticated");

        await UserService.followUser(ctx.user.id, to);
        return true;
    },

    unfollowUser: async (
        parent: any,
        { to }: { to: string },
        ctx: GraphqlContext
    ) => {
        if (!ctx.user || !ctx.user.id) throw new Error("unauthenticated");
        await UserService.unfollowUser(ctx.user.id, to);
        return true;
    },

}

const extraResolvers = {
    User: {
        tweets: (parent: User) =>
            prismaClient.tweet.findMany({ where: { user: { id: parent.id } } }),
        followers: async (parent: User) => {
            const result = await prismaClient.follows.findMany({
                where: { following: { id: parent.id } },
                include: {
                    follower: true,
                },
            });
            return result.map((el) => el.follower);
        },
        following: async (parent: User) => {

            // const cachedValue = await redisClient.get(`following:${parent.id}`);
            // if(cachedValue) return cachedValue;

            const result = await prismaClient.follows.findMany({
                where: { follower: { id: parent.id } },
                include: {
                    following: true,
                },
            });
            // await redisClient.set(`following:${parent.id}`,(el:any) => el.following)
            // return result.map((el) => el.following);
        },
        recommendedUsers: async (parent: User, args: any, ctx: GraphqlContext) => {
            if (!ctx.user) return [];
            const cachedValue = await redisClient.get(
                `RECOMMENDED_USERS:${ctx.user.id}`
            );

            if (cachedValue) {
                console.log("Cache Found");
                return JSON.parse(cachedValue);
            }

            const myFollowings = await prismaClient.follows.findMany({
                where: {
                    follower: { id: ctx.user.id },
                },
                include: {
                    following: {
                        include: { followers: { include: { following: true } } },
                    },
                },
            });

            const users: User[] = [];

            for (const followings of myFollowings) {
                for (const followingOfFollowedUser of followings.following.followers) {
                    if (
                        followingOfFollowedUser.following.id !== ctx.user.id &&
                        myFollowings.findIndex(
                            (e) => e?.followingId === followingOfFollowedUser.following.id
                        ) < 0
                    ) {
                        users.push(followingOfFollowedUser.following);
                    }
                }
            }

            console.log("Cache Not Found");
            await redisClient.set(
                `RECOMMENDED_USERS:${ctx.user.id}`,
                JSON.stringify(users)
            );

            return users;
        },
    },
};

export const resolvers = { queries, mutations, extraResolvers };