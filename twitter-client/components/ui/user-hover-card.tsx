'use client';

import React, { useState, useTransition } from 'react'
import * as z from 'zod';


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import { FaUser } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { FollowSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/gql/graphql';

interface UserCardProps {
    user: User;
}

export const UserHoverCard: React.FC<UserCardProps> = ({ user }) => {

    const [isPending, startTransition] = useTransition();
    const [isfollowed, setIsfollowed] = useState(false);

    // const currentUser = useCurrentUser();

    // const follows = user.followingIds?.filter((id) => id !== currentUser?.id);
    // const myFollow = user.id !== currentUser?.id ?? false;
    // let follows = user.followersIds?.includes(currentUser?.id as string) ?? false;

    const form = useForm<z.infer<typeof FollowSchema>>({
        resolver: zodResolver(FollowSchema),
        defaultValues: {
            id: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof FollowSchema>) => {
        setIsfollowed(!isfollowed);
        startTransition(() => {
            // follow((values))
        });
    }

    return (
        <div className='mx-2 flex flex-col bg-white gap-y-4'>
            <div className='flex justify-between w-full'>
                <Link href={`/${user?.username}`} className='flex'>
                    <Avatar>
                        <AvatarImage src={user?.profileImage || ''} />
                        <AvatarFallback>
                            <FaUser size={'30'} />
                        </AvatarFallback>
                    </Avatar>
                </Link>
                {/* {myFollow &&
                    <div className=''>
                        <Button size={'sm'} className='px-2' onClick={() => onSubmit(user)}>{follows ? 'unfollow' : 'follow'}</Button>
                    </div>
                } */}
            </div>
            <div className='flex flex-col gap-y-2'>
                <div className='flex flex-col'>
                    <Link href={`/${user?.username}`} className='text-black font-medium transition-colors hover:underline sm:text-lg'>{user.name}</Link>
                    <Link href={`/${user?.username}`} className='text-sm text-black font-normal transition-colors'>@{user?.username}</Link>
                </div>
                <div className='flex '>
                    <p className='text-sm text-black font-normal transition-colors'>
                        {user?.bio}
                    </p>
                </div>
            </div>
            <div className='flex justify-between'>
                <Link href={'/home'} className='text-xs hover:underline'>
                    <span className=' text-black font-semibold '>{user?.following?.length}</span>
                    <span className=' text-gray-700'>  Followings</span>
                </Link>
                <Link href={'/home'} className='text-xs hover:underline'>
                    <span className=' text-black font-semibold '>{user?.followers?.length}</span>
                    <span className=' text-gray-700'>  Followers</span>
                </Link>
            </div>
        </div>
    )
};

