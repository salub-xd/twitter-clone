'use client';

import dateFormat from 'dateformat';
import React, { useEffect, useState } from 'react'
import { PostClientPage } from './components/post-page';
import { Tweet, User } from '@/gql/graphql';
import { graphqlClient } from '@/clients/api';
import { getOneTweetQuery } from '@/graphql/query/tweet';

interface PostPageProps {
    params: {
        postId: string;
        username: string;
    };
}

const PostPage: React.FC<PostPageProps> = ({ params }) => {


    const username = params.username;
    const postId = params.postId;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [post, setPost] = useState<Tweet>();

    useEffect(() => {
        const fetchData = async () => {

            console.log(username);
            const post = await graphqlClient.request(getOneTweetQuery, { payload: { username: username, tweetId: postId } });
            console.log(post);
            setPost(post.getOneTweet as Tweet);
        }

        fetchData();

    }, [username, postId]);

    const formettedTweets: Tweet = {
        id: post?.id!,
        title: post?.title,
        image: post?.image,
        createdAt: dateFormat(post?.createdAt, 'mmm d, yy'),
        updatedAt: dateFormat(post?.updatedAt, 'mmm d, yy'),
        user: post?.user
    };

    return (
        <div className='w-[350px] sm:w-[400px] lg:w-[600px] border-b '>
            <PostClientPage data={formettedTweets as Tweet} />
        </div>
    )
}

export default PostPage;
