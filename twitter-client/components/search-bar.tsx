'use client';

import React, { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from 'lucide-react'
import Link from 'next/link'
import { FaUser } from 'react-icons/fa6'

export const SearchBar = () => {
    const [onOpen, setOpen] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        // Attach the event listener to the document
        document.addEventListener('click', handleClickOutside);

        // Clean up the event listener when the component is unmounted
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='relative'>
            <div className='flex' onClick={() => setOpen(!onOpen)} ref={divRef}>
                <Search className='absolute top-2 left-3 w-5 h-5 text-gray-500  ' />
                <input className='w-full h-full bg-[#f6f5f5] text-gray-700 px-3 border py-2 text-sm rounded-full pl-10 placeholder-gray-500 outline-none focus:border-sky-600 focus:bg-white ' type="text" placeholder='Search' name='text' />
            </div>
            {onOpen &&
                <div className='absolute w-full h-56 overflow-y-scroll scroll-ml-6 z-10 bg-white  my-2 py-2 px-2 gap-y-4 border rounded-xl'>
                    <div className='flex w-full justify-center py-2 px-2'>
                        <h1 className='font-normal text-sm'>Try searching people</h1>
                    </div>
                    <Link href={'/home'} className='flex my-2 py-2 rounded-xl items-center cursor-pointer border hover:bg-stone-100'>
                        <div className='ml-2'>
                            <Avatar>
                                <AvatarImage src='data:image/png;base64,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' />
                                <AvatarFallback>
                                    <FaUser size={'30'} />
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className='ml-3 w-28 flex flex-col items-start'>
                            <h1 className=' text-black font-semibold transition-colors sm:text-sm'>Ravish kumar</h1>
                            <p className='text-xs  text-black font-normal transition-colors '>@ravish_kumar</p>
                        </div>
                    </Link>
                    <Link href={'/home'} className='flex my-2 py-2 rounded-xl items-center cursor-pointer border hover:bg-stone-100'>
                        <div className='ml-2'>
                            <Avatar>
                                <AvatarImage src='data:image/png;base64,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' />
                                <AvatarFallback>
                                    <FaUser size={'30'} />
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className='ml-3 w-28 flex flex-col items-start'>
                            <h1 className=' text-black font-semibold transition-colors sm:text-sm'>Ravish kumar</h1>
                            <p className='text-xs  text-black font-normal transition-colors '>@ravish_kumar</p>
                        </div>
                    </Link>
                </div>
            }
        </div>
    )
}
