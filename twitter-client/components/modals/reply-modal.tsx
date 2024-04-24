'use client';

import * as z from 'zod'
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from '@/components/ui/modal';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
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

const formSchema = z.object({
    title: z.string().min(1, {
        message: "title must be at least 1 characters.",
    }),
    imageUrl: z.optional(z.string().min(1, {
        message: "image must be at least 1 characters.",
    })),
}
);

export const ReplyModal = () => {

    const repostModal = useRepostModal();
    const [isLoading, setIsloading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            imageUrl: ''
        }
    });

    const onSubmit = () => {

    }

    return (
        <Modal isOpen={repostModal.isOpen} onClose={repostModal.onClose}>
            <div className='flex'>

            </div>
            <div className=' space-y-4 py-4 pb-4'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className='w-full flex gap-x-4 '>
                            <Avatar>
                                <AvatarImage src={'a' || ''} />
                                <AvatarFallback>
                                    <FaUser size={'30'} />
                                </AvatarFallback>
                            </Avatar>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input disabled={isLoading} placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='mx-4 space-x-2 w-full flex items-center justify-end'>
                            <Button className=' bg-sky-500 hover:bg-sky-600' type="submit">Post</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    )
}

