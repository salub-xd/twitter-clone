'use client';

import React from 'react'
import { Button } from '@/components/ui/button';
import { FaArrowLeft } from 'react-icons/fa6';
import Image from 'next/image';
import { BsThreeDots } from 'react-icons/bs';
import { FaArrowRightFromBracket, FaRegBookmark, FaRegComment, FaRegHeart, FaRetweet, FaUser } from 'react-icons/fa6';
import { LuPenLine } from "react-icons/lu";
import { VscGraph } from 'react-icons/vsc';
import { AiOutlineRetweet } from "react-icons/ai";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from 'next/link';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { UserHoverCard } from '@/components/ui/user-hover-card';
import { useRouter } from 'next/navigation';
import { Tweet, User } from '@/gql/graphql';

interface PostPageProps {
    data: Tweet;
};

export const PostClientPage: React.FC<PostPageProps> = ({ data }) => {

    const router = useRouter();

    return (
        <div className='w-[350px] sm:w-[400px] lg:w-[600px] border-b '>
            <div className='flex flex-col p-1'>
                <div className='flex gap-x-5 gap-y-2 py-1'>
                    <Button variant={'ghost'} size={'icon'} className='rounded-full' onClick={() => router.back()}>
                        <FaArrowLeft />
                    </Button>
                    <div className='gap-y-2'>
                        <h1 className='font-semibold text-sm sm:text-lg'>Posts</h1>
                    </div>
                </div>
                <div className='flex w-full px-2 py-2 gap-x-2 border-b border-0 sm:px-4'>
                    <Link href={`/${data?.user?.username}`} className='flex items-start rounded-lg w-10 sm:w-auto'
                    >
                        <HoverCard>
                            <HoverCardTrigger className='flex' >
                                <Image
                                    src={data?.user?.profileImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7yWsejybngIUzEn_Kl8ZmvUeV3auYr-Cw2Adp3q3yeYhikwKTm0nVLfZTfQ&s'}
                                    width={'50'}
                                    height={'50'}
                                    alt='X-logo'
                                    className='items-center rounded-full overflow-hidden'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <UserHoverCard user={data?.user as User} />
                            </HoverCardContent>
                        </HoverCard>
                    </Link>
                    <div className='flex flex-col w-full '>
                        <div className='flex items-center '>
                            <div className='flex w-full'>
                                <div className='flex items-center '>
                                    <HoverCard>
                                        <HoverCardTrigger className='flex' >
                                            <Link href={`/${data?.user?.username}`} className='font-semibold hover:underline text-xs sm:text-sm'>
                                                {data?.user?.name}
                                            </Link>
                                            <Link href={`/${data?.user?.username}`} className='mx-1 text-gray-700 font-normal text-xs sm:text-sm sm:mx-2'>
                                                @{data?.user?.username}
                                            </Link>
                                        </HoverCardTrigger>
                                        <HoverCardContent>
                                            <UserHoverCard user={data?.user as User} />
                                        </HoverCardContent>
                                    </HoverCard>
                                    <code>-</code>
                                    <p className='mx-1 text-gray-700 font-normal text-sm sm:mx-2'>{data.createdAt?.toString()}</p>
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button className='px-2 py-0 w-8 h-6 rounded-full bg-white group group hover:bg-sky-100'>
                                                <BsThreeDots className='text-black group-hover:text-sky-500' />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className='py-1 px-2'>
                                            <p className='text-xs'>More</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <div className='flex w-auto'>
                                <h1 className=' text-black font-normal text-xs sm:text-lg'>{data.title}</h1>
                            </div>
                            {data.image &&
                                <div className='rounded-xl border relative aspect-[4/1.5] md:aspect-[2.4/2] overflow-hidden'>
                                    <Image
                                        src={data.image}
                                        fill
                                        alt='X-logo'
                                        className=' rounded-xl'
                                    />
                                </div>
                            }
                            <div className='flex items-center justify-between '>
                                <div className='flex items-center group'>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Button variant={'ghost'} className='text-center flex items-center px-1 py-0.5 rounded-full sm:pr-2.5'>
                                                    <FaRegComment size={35} className='text-gray-500 py-2 rounded-full group-hover:bg-sky-100 group-hover:text-sky-500' />
                                                    <span className=' text-gray-500 font-normal text-xs group-hover:text-sky-500'>1.5k</span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent className='py-1 px-2'>
                                                <p className='text-xs'>Reply</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <div className='flex items-center group'>
                                    <DropdownMenu>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <DropdownMenuTrigger asChild className='border-none outline-none'>
                                                        <Button variant={'ghost'} className='text-center flex items-center px-1 py-0.5 rounded-full sm:px-2.5'>
                                                            <AiOutlineRetweet size={35} className='text-gray-500 py-2 rounded-full group-hover:bg-green-100 group-hover:text-green-500 ' />
                                                            <span className='text-gray-500 font-normal text-xs group-hover:text-green-600'>3.5k</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                </TooltipTrigger>
                                                <TooltipContent className='py-1 px-2'>
                                                    <p className='text-xs'>Repost</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <DropdownMenuContent className='p-0 flex flex-col items-center'>
                                            <DropdownMenuItem className='p-0'>
                                                <Button variant={'ghost'} size={'lg'} className='text-black'>
                                                    <FaRetweet size={20} className='text-gray-700 mr-2 rounded-full ' />
                                                    Repost
                                                </Button>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className='p-0'>
                                                <Button variant={'ghost'} size={'lg'} className='text-black' >
                                                    <LuPenLine size={20} className='text-black mr-2 rounded-full ' />
                                                    Quote
                                                </Button>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className='flex items-center group'>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Button variant={'ghost'} className='text-center flex items-center px-1 py-0.5 rounded-full sm:px-2.5'>
                                                    <FaRegHeart size={35} className='text-gray-500 py-2 rounded-full group-hover:bg-pink-100 group-hover:text-pink-500 ' />
                                                    <span className='text-gray-500 font-normal text-xs group-hover:text-pink-500'>1k</span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent className='py-1 px-2'>
                                                <p className='text-xs'>Like</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <div className='flex items-center group'>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Button variant={'ghost'} className='text-center flex items-center px-1 py-0.5 rounded-full sm:px-2.5'>
                                                    <VscGraph size={35} className='text-gray-500 py-2 rounded-full group-hover:bg-sky-100 group-hover:text-sky-500 ' />
                                                    <span className='text-gray-500 font-normal text-xs group-hover:text-sky-500'>155.5k</span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent className='py-1 px-2'>
                                                <p className='text-xs'>Views</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <div className=' items-center hidden xs:flex'>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Button className='text-center flex items-center px-1 py-0.5 rounded-full sm:px-2.5 bg-white  group hover:opacity-100 hover:bg-sky-100'>
                                                    <FaRegBookmark className='text-gray-500 w-4 h-4 group-hover:text-sky-500 ' />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent className='py-1 px-2'>
                                                <p className='text-xs'>Bookmark</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Button className='text-center flex items-center px-1 py-0.5 rounded-full sm:px-2.5 bg-white group hover:opacity-100 hover:bg-sky-100'>
                                                    <FaArrowRightFromBracket style={{ transform: 'rotate(270deg)' }} className='text-gray-500 w-4 h-4  group-hover:text-sky-500 ' />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent className='py-1 px-2'>
                                                <p className='text-xs'>Share</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

