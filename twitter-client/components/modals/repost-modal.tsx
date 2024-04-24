'use client';

import * as z from 'zod'
import React, { useCallback, useEffect, useState, useTransition } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from '@/components/ui/modal';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';
import { useRepostModal } from '@/hooks/use-repost-modal';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaUser } from 'react-icons/fa6';
import ImageUpload from '@/components/ui/image-upload';
import { useRouter } from 'next/navigation';
import { PostSchema } from '@/schemas';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { ClipLoader } from 'react-spinners';
import { useCreateTweet } from '@/hooks/tweet';

export const RepostModal = () => {

    const repostModal = useRepostModal();
    const [isPending, startTransition] = useTransition();
    const [isError, setIsError] = useState<string | undefined>("");
    const [isSuccess, setIsSuccess] = useState<string | undefined>("");

    const { mutate } = useCreateTweet();

    const router = useRouter();

    const form = useForm<z.infer<typeof PostSchema>>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            title: '',
            image: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof PostSchema>) => {
        mutate({ title:values?.title,image:values?.image })
    }

    return (
        <Modal isOpen={repostModal.isOpen} onClose={repostModal.onClose}>
            <div className='space-y-4 pb-4'>
                <h1 className='font-bold text-xl text-center'>Retweet</h1>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className='flex gap-x-4'>
                                            <Avatar>
                                                <AvatarImage src={'a' || ''} />
                                                <AvatarFallback>
                                                    <FaUser size={'30'} />
                                                </AvatarFallback>
                                            </Avatar>
                                            <Input disabled={isPending} placeholder="What is happening?!" {...field} className='placeholder-black text-lg font-sans' />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div >
                                            <ImageUpload
                                                value={field.value ? [field.value] : []}
                                                onChange={(url) => field.onChange(url)}
                                                onRemove={() => field.onChange('')}
                                                disabled={isPending}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <FormError message={isError} />
                        <FormSuccess message={isSuccess} />
                        <div className='mx-1 space-x-2 w-full flex items-center justify-end'>
                            <Button disabled={isPending} type="submit">
                                {isPending && <ClipLoader color="white" size={20} className="mr-2" />}
                                Create an Post
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    )
}

