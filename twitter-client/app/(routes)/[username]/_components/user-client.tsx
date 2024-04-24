"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TwitterCard } from '@/components/ui/twitter-card';
import { Button } from '@/components/ui/button';
import { FaArrowLeft } from "react-icons/fa";
import Image from 'next/image';
import { BsThreeDots } from 'react-icons/bs';
import { SlCalender } from "react-icons/sl";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/gql/graphql';
import { useCurrentUser } from '@/hooks/user';
import { graphqlClient } from '@/clients/api';
import { followUserMutation, unfollowUserMutation } from '@/graphql/mutation/user';
import { useQueryClient } from '@tanstack/react-query';

interface UserClientProps {
    data: User;

}

export const UserClient: React.FC<UserClientProps> = ({
    data,
}) => {

    const router = useRouter();
    const { user } = useCurrentUser();
    const queryClient = useQueryClient();

    const amIFollowing = useMemo(() => {
        if (!data.id) return false;
        return (
            (user?.following?.findIndex(
                (el: any) => el?.id === data?.id
            ) ?? -1) >= 0
        );
    }, [user?.following, data]);

    const handleFollowUser = useCallback(async () => {
        if (!data?.id) return;

        await graphqlClient.request(followUserMutation, { to: data?.id });
        await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    }, [data?.id, queryClient]);

    const handleUnfollowUser = useCallback(async () => {
        if (!data?.id) return;

        await graphqlClient.request(unfollowUserMutation, {
            to: data?.id,
        });
        await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    }, [data?.id, queryClient]);

    return (
        <div className='lg:w-[600px] border-b '>
            <div className='flex flex-col p-1'>
                <div className='flex gap-x-5 gap-y-2 py-1'>
                    <Button variant={'ghost'} size={'icon'} className='rounded-full' onClick={() => router.back()}>
                        <FaArrowLeft />
                    </Button>
                    <div className='gap-y-2'>
                        <h1 className='font-semibold text-sm sm:text-lg'>{data?.name}</h1>
                        <p className=' text-gray-700 font-normal text-xs sm:text-xs'>{data?.tweets?.length}
                            <span className='ml-1'>posts</span>
                        </p>
                    </div>
                </div>
                <div className='border relative aspect-[4/1.5] overflow-hidden'>
                    {data?.coverImage ?
                        <Image
                            src={data?.coverImage}
                            fill
                            alt='X-logo'
                            className=''
                        />
                        : <div className='w-full h-full bg-gray-300' />
                    }
                </div>
                <div className='flex flex-col px-4 py-2'>
                    <div className='flex justify-between gap-x-4'>
                        <div className='absolute top-40 rounded-full border-2'>
                            <Image
                                src={data?.profileImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7yWsejybngIUzEn_Kl8ZmvUeV3auYr-Cw2Adp3q3yeYhikwKTm0nVLfZTfQ&s'}
                                alt='X-logo'
                                className=' rounded-full overflow-hidden w-20 sm:w-36 '
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className='w-full flex items-center justify-end gap-x-4'>
                            <Button variant={'ghost'} size={'icon'} className='rounded-full border'>
                                <BsThreeDots />
                            </Button>
                            {user?.id !== data.id && <>
                                {amIFollowing ?
                                    <Button onClick={handleUnfollowUser}>
                                        Unfollow
                                    </Button>
                                    :
                                    <Button onClick={handleFollowUser}>
                                        Follow
                                    </Button>}
                            </>
                            }
                        </div>
                    </div>
                </div>
                <div className='flex py-4 p-4 '>
                    <div className='space-y-2'>
                        <div className=''>
                            <h1 className='font-semibold text-sm sm:text-lg'>{data?.name}</h1>
                            <h2 className=' text-gray-700 font-semibold text-sm'>@{data?.username}</h2>
                        </div>
                        <div>
                            <p className='text-gray-700 font-normal text-sm '>{data?.bio}</p>
                        </div>
                        <div>
                            <p className='flex items-center text-gray-600 text-sm font-normal'><SlCalender className='mr-2 w-4 h-4' /><span>{data?.createdAt.toString()}</span></p>
                        </div>
                        <div className='flex gap-x-4'>
                            <Link href={'/home'} className='text-xs hover:underline'>
                                <span className=' text-black font-semibold '>{data.following?.length}</span>
                                <span className=' text-gray-700'>  Following</span>
                            </Link>
                            <Link href={'/home'} className='text-xs hover:underline'>
                                <span className=' text-black font-semibold '>{data.followers?.length}</span>
                                <span className=' text-gray-700'>  Followers</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
