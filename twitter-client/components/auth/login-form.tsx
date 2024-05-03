"use client";

import { CardWrapper } from '@/components/auth/card-wrapper';
import { LoginSchema } from '@/schemas';
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
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';
import { useToast } from '../ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { graphqlClient } from '@/clients/api';
import { getLoginUserQuery } from '@/graphql/query/user';

const LoginForm = () => {

    const [isPending, setIsPending] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });


    const queryClient = useQueryClient();

    const { toast } = useToast();
    const onSubmit = useCallback(async (values: z.infer<typeof LoginSchema>) => {
        try {
            setIsPending(true);
            const { loginUser } = await graphqlClient.request(getLoginUserQuery, { payload: { email: values.email, password: values.password } });

            // console.log(loginUser);

            if (!loginUser) {
                toast({ variant: "destructive", title: "Email or password is incorrect!", description: "Something went wrong!" });
            }
            toast({ title: "User successfully login!" });

            window.localStorage.setItem("twitter-token", loginUser as string);

            await queryClient.invalidateQueries({ queryKey: ['current-user'] });

            router.push('/home')

        } catch (error) {
            toast({ variant: "destructive", title: "Email or password is incorrect!", description: "Something went wrong!" });

        } finally {
            setIsPending(false);
        }

    }, [toast, queryClient, router]);

    return (
        <CardWrapper
            headerLabel='Welcome back'
            backButtonLabel='Dont have an account?'
            backButtonHref='/auth/register'
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                                <Button
                                    disabled={isPending}
                                    size={"sm"}
                                    variant={"link"}
                                    className='px-0 font-normal'
                                >
                                    <Link
                                        href={'/auth/reset'}
                                    >
                                        Forget Password?
                                    </Link>
                                </Button>
                            </FormItem>
                        )}
                    />
                    <Button disabled={isPending} type="submit" className='w-full' >
                        {isPending && <ClipLoader color="white" size={20} className="mr-2" />}
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default LoginForm;
