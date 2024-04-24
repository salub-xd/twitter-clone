import { Tweet } from "@prisma/client";
import { prismaClient } from "../../clients/db";
import { GraphqlContext } from "../../types";
import TweetService from "../../services/tweet";

interface CreateTweetPayload {
    title?: string;
    image?: string;
}
interface GetOneTweetPayload {
    username: string;
    tweetId: string;
}

const queries = {
    getAllTweets: () =>
        TweetService.getAllTweets(),
    getOneTweet: async (parent: any, { payload }: { payload: GetOneTweetPayload }) => {

        const tweet = await TweetService.getOneTweet({
            ...payload
        });

        return tweet;
    }
};

const mutations = {
    createTweet: async (parent: any, { payload }: { payload: CreateTweetPayload }, ctx: GraphqlContext) => {

        if (!ctx.user) throw new Error("You are not authenticated");

        const tweet = await TweetService.createTweet({ ...payload, userId: ctx.user.id });

        return tweet;

    },
}

const extraResolvers = {
    Tweet: {
        user: (parent: Tweet) =>
            prismaClient.user.findUnique({
                where: {
                    id: parent.userId
                }
            })
    }
}

export const resolvers = { mutations, extraResolvers, queries }