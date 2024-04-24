'use client';

import { Button } from '@/components/ui/button';
import { TwitterCard } from '@/components/ui/twitter-card';
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import { Tweet } from '@/gql/graphql';
import dateFormat, { masks } from 'dateformat';
import { useCurrentUser } from '@/hooks/user';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { PostSchema } from '@/schemas';
import { useCreateTweet } from '@/hooks/tweet';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { ClipLoader } from 'react-spinners';
import ImageUpload from '../../../../components/ui/image-upload';
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa6';


interface CenterbarProps {
    posts: Tweet[]
}

const Centerbar: React.FC<CenterbarProps> = ({ posts }) => {


    const { mutate } = useCreateTweet();

    const router = useRouter();

    const { user } = useCurrentUser();
    const [isPending, setIsPending] = useState<boolean>(false);
    const [isFormDirty, setIsFormDirty] = useState<boolean>(false); // State to track form dirtiness


    const formettedProducts: Tweet[] = posts.map((item) => ({
        id: item.id,
        title: item?.title,
        image: item?.image,
        createdAt: dateFormat(item.createdAt, 'mmm d, yy'),
        updatedAt: dateFormat(item.updatedAt, 'mmm d, yy'),
        user: item.user
    }))


    console.log(formettedProducts);

    const form = useForm<z.infer<typeof PostSchema>>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            title: '',
            image: ''
        },
    });

    useEffect(() => {
        // Check if form is dirty
        setIsFormDirty(form.formState.isDirty);
    }, [form.formState.isDirty]);

    const onSubmit = async (values: z.infer<typeof PostSchema>) => {
        if(!user) router.push('/');
        setIsPending(true);
        await mutate({ title: values?.title, image: values?.image });
        setIsPending(false);
        form.reset();

    }

    return (
        <div className='w-full flex flex-col justify-start'>
            <div className='flex items-start'>
                <Button
                    className=' w-1/2 py-6 rounded-none bg-white text-gray-700 shadow hover:opacity-100 hover:bg-stone-200'
                >For You
                </Button>
                <Button
                    className=' w-1/2 py-6 rounded-none bg-white text-gray-700 shadow hover:opacity-100 hover:bg-stone-200 border-l'
                >Following
                </Button>
            </div>
            <div className='flex justify-between border-y py-1'>
                <div className='flex items-start w-10 py-2 mx-2'>
                    <Link href={`/${user?.username}`} className=''>
                        <Avatar>
                            <AvatarImage src={user?.profileImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7yWsejybngIUzEn_Kl8ZmvUeV3auYr-Cw2Adp3q3yeYhikwKTm0nVLfZTfQ&s'} />
                            <AvatarFallback>
                                <FaUser size={'25'} />
                            </AvatarFallback>
                        </Avatar>
                    </Link>
                </div>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full' >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className='flex flex-col px-2'>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder="What is happening?!" {...field} className='placeholder-black outline-none w-full h-14 text-lg font-sans rounded-none focus-visible:ring-0 border-none' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className='flex items-center justify-between'>
                                            <ImageUpload
                                                value={field.value ? [field.value] : []}
                                                onChange={(url) => field.onChange(url)}
                                                onRemove={() => field.onChange('')}
                                                disabled={isPending}
                                            />
                                            <Button disabled={!isFormDirty || isPending} type="submit" className='mx-2 items-center justify-center  bg-sky-500 hover:bg-sky-600 '>
                                                {isPending && <ClipLoader color="white" size={20} className="mr-2" />} Post
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </form>
                </Form>

            </div>
            {
                formettedProducts?.map((item) => (
                    // <div  className='flex w-full px-2 py-2 gap-x-2 border-b border-0 sm:px-4'>
                    <TwitterCard key={item?.id} data={item as Tweet} />
                    // {/* </div> */}
                ))
            }
        </div >
    )
}

export default Centerbar;


