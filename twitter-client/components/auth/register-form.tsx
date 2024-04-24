"use client";

import { CardWrapper } from '@/components/auth/card-wrapper';
import { RegisterSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { useCallback, useState, useTransition } from 'react';
// import { register } from '@/actions/register';
import { ClipLoader } from 'react-spinners';
import { useCreateUser } from '@/hooks/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUserMutation } from '@/graphql/mutation/user';
import { graphqlClient } from '@/clients/api';
import { FaCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { BsExclamationTriangle } from 'react-icons/bs';

const RegisterForm = () => {

    const [isPending, setIsPending] = useState(false);

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            username: "",
            email: '',
            password: '',
        }
    })


    const { mutate } = useCreateUser();

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        try {
            setIsPending(true);
            await mutate({ name: values.name, username: values.username, email: values.email, password: values.password });
        } catch (error) {
            console.log(error);
        } finally {
            setIsPending(false);
        }

    };

    return (
        <CardWrapper
            headerLabel='Create an account'
            backButtonLabel='Already have an account?'
            backButtonHref='/auth/login'
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} type='name' placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} type='username' placeholder="johndoe1" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} type='email' placeholder="johndoe@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} type='password' placeholder="******" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isPending} type="submit" className='w-full'>
                        {isPending && <ClipLoader color="white" size={20} className="mr-2" />}
                        Create an Account</Button>
                </form>
            </Form>
        </CardWrapper >
    )
}

export default RegisterForm;
