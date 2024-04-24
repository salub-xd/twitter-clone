'use client';

import React, { useState, useEffect } from 'react'
import { BsThreeDots } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { FaUser } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

interface User {
        id: string;
        name: string;
        email: string;
        profileImage?: string;
        username?: string; // Assuming username should always be a string
}

type UserButtonProps = {
    data: User;

};


export const UserButton: React.FC<UserButtonProps> = ({
    data,
}) => {

    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    const handleLogout = () => {
        window.localStorage.removeItem("twitter-token");
        router.push('/');
    }

    return (
        <Popover>
            <PopoverTrigger className='w-auto rounded-full bg-white hover:bg-stone-200 lg:w-56 '>
                <Button className='flex items-center border rounded-full justify-center py-8 transition-colors bg-white hover:bg-stone-200 '>
                    <div className='flex items-center lg:ml-2 lg:space-x-4 '>
                        <Avatar>
                            <AvatarImage src={data?.profileImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7yWsejybngIUzEn_Kl8ZmvUeV3auYr-Cw2Adp3q3yeYhikwKTm0nVLfZTfQ&s'} />
                            <AvatarFallback>
                                <FaUser size={'30'} />
                            </AvatarFallback>
                        </Avatar>
                        <div className='w-28 flex-col items-start hidden lg:flex'>
                            <h1 className='text-lg text-black font-semibold transition-colors sm:text-lg'>{data?.name}</h1>
                            {data.username && <p className='text-sm  text-black font-normal transition-colors'>@{data?.username}</p>}
                        </div>
                    </div>
                    <div className='hidden lg:flex'>
                        <BsThreeDots className='w-5 h-5 text-black' />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-56 border shadow-none rounded-xl py-1 bg-white hover:bg-stone-200'>
                <Button className='w-full hover:bg-stone-200 py-1' variant={'ghost'} onClick={handleLogout}>
                    Logout
                    <span className='ml-2 font-light'>@</span>{data.username}
                </Button>
            </PopoverContent>
        </Popover>
    )
}
