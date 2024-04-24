import JWT from "jsonwebtoken";
import { User } from "@prisma/client";
import { JWTUser } from "../types";
import { prismaClient } from "../clients/db";
import { redisClient } from "../clients/redis";

export interface CreateTweetPayload {
    title?: string;
    image?: string;
    userId: string;
}

interface GetOneTweetPayload {
    username: string;
    tweetId: string;
}

class TweetService {

    public static async createTweet(data: CreateTweetPayload) {

        const rateLimitFlag = await redisClient.get(
            `RATE_LIMIT:TWEET:${data.userId}`
        );
        if (rateLimitFlag) throw new Error("Please wait....");

        const tweet = await prismaClient.tweet.create({
            data: {
                title: data?.title,
                image: data?.image,
                user: { connect: { id: data.userId } }
            }
        });

        await redisClient.setex(`RATE_LIMIT:TWEET:${data.userId}`, 10, 1);
        await redisClient.del("ALL_TWEETS");

        return tweet;
    }

    public static async getAllTweets() {
        const cachedTweets = await redisClient.get("ALL_TWEETS");
        if (cachedTweets) return JSON.parse(cachedTweets);

        const tweets = await prismaClient.tweet.findMany({ orderBy: { createdAt: "desc" } });

        await redisClient.set("ALL_TWEETS", JSON.stringify(tweets));
        return tweets;
    }

    public static async getOneTweet(data: GetOneTweetPayload) {
        const cachedTweets = await redisClient.get(`ONE_TWEET:${data.tweetId}:USERNAME:${data.username}`);
        if (cachedTweets) return JSON.parse(cachedTweets);
        
        const tweet = await prismaClient.tweet.findUnique({
            where: {
                id: data.tweetId,
                user: { username: data.username }
            }
        });

        if (!tweet) throw new Error("Tweet does not exists!");

        await redisClient.set(`ONE_TWEET:${data.tweetId}:USERNAME:${data.username}`,JSON.stringify(tweet));
        return tweet;
    }

}

export default TweetService;