"use client";

import React from 'react'
import Centerbar from './components/centerbar';
import dateFormat, { masks } from 'dateformat';
import { useGetAllTweets } from '@/hooks/tweet';
import { Tweet } from '@/gql/graphql';

interface HomePageProps {
    Tweets: Tweet[]
}

const HomePage = () => {
    
    const { tweets = [] } = useGetAllTweets();
    console.log(tweets);


    // const posts = await db.post.findMany({
    //     orderBy: {
    //         createdAt: 'desc'
    //     },
    //     include: {
    //         user: true
    //     }
    // });


    // const formettedProducts: CenterbarProps = tweets.map((item:any) => ({
    //     id: item?.id,
    //     title: item?.title,
    //     image: item?.image,
    //     // likedIds: item.likedIds,
    //     // createdAt:format(item.createdAt, 'MMMM do, yyyy'),
    //     createdAt: dateFormat(item?.createdAt, 'mmm d, yy'),
    //     updatedAt: dateFormat(item?.createdAt, 'mmm d, yy'),
    //     user: item?.user
    // }))

    // console.log(posts);

    return (
        <>
            <div className='w-auto sm:w-[600px] border-x'>
                <Centerbar posts={tweets as Tweet[]} />
            </div>
        </>
    )
}

export default HomePage;