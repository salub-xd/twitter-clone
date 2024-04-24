'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FaUser } from 'react-icons/fa6';
import { SearchBar } from '@/components/search-bar';
import { UserHoverCard } from '@/components/user-hover-card';
import { useCurrentUser } from '@/hooks/user';
import { User } from '@/gql/graphql';

const Rightbar = () => {

    const { user } = useCurrentUser();

    return (
        <div className='fixed top-1 flex flex-col my-2 mx-2 gap-y-4'>
            <div className='mx-2'>
                <SearchBar />
            </div>
            {/* <div className='flex flex-col gap-y-2 border py-2 px-2'>
                <div className='mx-2 items-center'>
                    <h1 className='text-xl font-sans font-bold'>Who to follow</h1>
                </div>
                <div className='flex flex-col space-y-2' >
                    {user?.recommendedUsers?.map((el) => (
                        <div key={el?.id} className='flex items-center justify-between py-2 space-x-2 rounded-full transition-colors  bg-white hover:bg-gray-100'>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <div className='flex items-center'>
                                        <div className='ml-2'>
                                            <Avatar>
                                                <AvatarImage src={user?.profileImage || ''} />
                                                <AvatarFallback>
                                                    <FaUser size={'30'} />
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className='ml-2 w-28 flex flex-col items-start'>
                                            <h1 className=' text-black font-medium transition-colors hover:underline sm:text-sm'>{user?.name}</h1>
                                            <p className='text-xs  text-black font-normal transition-colors '>@{user?.username}</p>
                                        </div>
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <UserHoverCard user={user as User} />
                                </HoverCardContent>
                            </HoverCard>
                            <Button size={'sm'} className='text-xs rounded-full bg-black'>
                                Follow
                            </Button>
                        </div>
                    ))}
                </div>
            </div> */}
            <div className=' w-full flex flex-col items-center my-4 gap-y-1 hover:bg-gray-100'>
                <div className='flex gap-x-2 '>
                    <Link href={'/'} className='text-xs text-black font-sans transition-colors hover:underline'>Terms of Service</Link>
                    <Link href={'/'} className='text-xs text-black font-sans transition-colors hover:underline'>Privacy Policy</Link>
                    <Link href={'/'} className='text-xs text-black font-sans transition-colors hover:underline'>Cookie Policy</Link>
                </div>
                <div className='flex gap-x-2 '>
                    <Link href={'/'} className='text-xs text-black font-sans transition-colors hover:underline'>Accessibility</Link>
                    <Link href={'/'} className='text-xs text-black font-sans transition-colors hover:underline'>
                        &#169; 2024 X Corp
                    </Link>
                    <Link href={'/'} className='text-xs text-black font-sans transition-colors hover:underline'>More...</Link>
                </div>
            </div>
        </div >
    )
}

export default Rightbar
