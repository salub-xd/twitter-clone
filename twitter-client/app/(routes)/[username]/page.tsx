'use client';

import React, { useEffect, useState } from 'react';
import { UserClient } from './_components/user-client';
import { TwitterCard } from '@/components/ui/twitter-card';
import dateFormat, { masks } from "dateformat";
import { Tweet, User } from '@/gql/graphql';
import { getUserByNameQuery } from '@/graphql/query/user';
import { graphqlClient } from '@/clients/api';

interface UsernameProps {
    params: {
        username: string;
    };
}

const UsernamePage: React.FC<UsernameProps> = ({ params }) => {

    const username = params.username;
    const [user, setUser] = useState<User>();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const fetchData = async () => {

            console.log(username);
            const user = await graphqlClient.request(getUserByNameQuery, { username });
            console.log(user);
            setUser(user.getUserByName as User);
        }

        fetchData()

    }, [username]);

    const formettedUser: User = {
        id: user?.id!,
        name: user?.name!,
        email: user?.email!,
        username: user?.username,
        bio: user?.bio,
        profileImage: user?.profileImage,
        coverImage: user?.coverImage,
        createdAt: dateFormat(user?.createdAt, 'mmm d, yy'),
        followers: user?.followers,
        following: user?.following
    }

    const formettedTweets = user?.tweets?.map((item) => ({
        id: item?.id,
        title: item?.title,
        image: item?.image,
        createdAt: dateFormat(item?.createdAt, 'mmm d, yy'),
        updatedAt: dateFormat(item?.updatedAt, 'mmm d, yy'),
        user: item?.user,
    }))

    console.log(formettedTweets);

    return (
        <div className="w-auto sm:w-[600px] border">
            <UserClient data={formettedUser} />
            {formettedTweets?.map((item) => (
                <TwitterCard key={item?.id} data={item as Tweet} />
            ))}
        </div>
    );
};

export default UsernamePage;