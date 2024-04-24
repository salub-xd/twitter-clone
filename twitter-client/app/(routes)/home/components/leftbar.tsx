'use client';

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button';
import { UserButton } from '@/components/auth/user-button';
import { BellIcon, Bookmark, Settings, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { GoHomeFill } from 'react-icons/go';
import { BsTwitterX } from 'react-icons/bs';
import { useRepostModal } from '@/hooks/use-repost-modal';
import { FaPlus } from "react-icons/fa";
// import { User } from '@/types';
import { useCurrentUser } from '@/hooks/user';
// import { UserButtonn } from '@/components/user-buttonn';

interface User {
    id: string;
    name: string;
    username?: string;
    email: string;
    profileImage?: string
}

export const Leftbar = () => {

    const repostModal = useRepostModal();
    const { user } = useCurrentUser();

    // const user = useCurrentUser();
    const params = useParams();
    const pathname = usePathname();

    const router = useRouter();

    const routes = [
        {
            label: 'Home',
            icon: GoHomeFill,
            href: `/home`,
            active: pathname === `/home`
        },
        {
            label: 'Notifications',
            icon: BellIcon,
            href: `/notifications`,
            active: pathname === `/notifications`
        },
        {
            label: 'Bookmarks',
            icon: Bookmark,
            href: `/bookmarks`,
            active: pathname === `/bookmarks`
        },
        {
            label: 'Profile',
            icon: UserIcon,
            href: user && user.username ? `/${user?.username}` : `/login`,
            active: pathname === `/profile`
        },
        {
            label: 'Settings',
            icon: Settings,
            href: `/settings`,
            active: pathname === `/settings`
        },
    ];

    // console.log(pathname);

    const handleClick = () => {
        if (!user){
            router.push('/');

        } else{
            repostModal.onOpen();
        }
    }


    return (
        <div className='fixed top-1 flex flex-col my-1 mx-2 '>
            <div className='w-auto'>
                <div className='flex justify-center items-center lg:justify-start'>
                    <BsTwitterX className='w-12 h-12 rounded-full py-2 px-2 hover:bg-stone-200' />
                </div>
                {routes.map((route) => (
                    <Link key={route.href} href={route.href} className='w-full flex justify-center items-center group lg:justify-start' >
                        <div className='flex justify-center items-center rounded-full py-2 pr-6 pl-2 gap-x-4 transition-colors group-hover:bg-stone-200'>
                            <div className='ml-2'>
                                <route.icon size={25} />
                            </div>
                            <div className={cn('text-lg transition-colors sm:text-xl hidden lg:block', route.active ? 'font-bold' : 'font-normal')}>
                                <span className=''>{route.label}</span>
                            </div>
                        </div>
                    </Link>
                ))}
                <div className='flex flex-col justify-center items-center mt-2 gap-y-6 lg:justify-start'>
                    <div className='my-2'>
                        <Button
                            className=" bg-sky-500 rounded-full hover:bg-sky-600 font-semibold lg:px-20 lg:py-6"
                            onClick={handleClick}
                        >
                            <span className='hidden lg:block'>Post</span>
                            <FaPlus className='block lg:hidden' />
                        </Button>
                    </div>
                    {user  ? <UserButton data={user as User} /> :
                        <Link href={'/auth/login'}><Button className='flex items-center border rounded-full justify-center py-6 px-16 transition-colors bg-sky-500 hover:bg-sky-600 '>Login</Button></Link>
                    }
                </div>
            </div>

        </div >
    )
}

