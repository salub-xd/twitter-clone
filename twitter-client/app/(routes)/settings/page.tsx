"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

import { SettingsSchema } from "@/schemas";
import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ClipLoader } from "react-spinners";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { graphqlClient } from "@/clients/api";
import { useRouter } from "next/navigation";
import { getUpdateUserQuery } from "@/graphql/query/user";

const SettingsPage = () => {

    const { user } = useCurrentUser();

    const { toast } = useToast();

    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || '',
            username: user?.username || '',
            email: user?.email || '',
            bio: user?.bio || '',
            coverImage: user?.coverImage || '',
            profileImage: user?.profileImage || '',
            password: undefined,
            newPassword: undefined,
        }
    });

    const queryClient = useQueryClient();

    const onSubmit = useCallback(async (values: z.infer<typeof SettingsSchema>) => {
        try {
            setIsPending(true);

            const { updateUser } = await graphqlClient.request(getUpdateUserQuery, { payload: { name: values.name, username: values.username, email: values.email, bio: values.bio, coverImage: values.coverImage, profileImage: values.profileImage, password: values.password } });

            // console.log(loginUser);
            console.log(updateUser);

            if (!updateUser) {
                toast({ variant: "destructive", description: "Something went wrong!" });
            }

            toast({ title: "User successfully updated!" });

            window.localStorage.setItem("twitter-token", updateUser as string);

            await queryClient.invalidateQueries({ queryKey: ['current-user'] });

        } catch (error) {
            toast({ variant: "destructive", title: "Something went wrong!", description: "Something went wrong!" });

        } finally {
            setIsPending(false);
        }

    }, [toast, queryClient]);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <Card className="w-[350px] sm:w-[400px] lg:w-[600px] shadow-none ">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    ⚙️ Settings
                </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="John Doe"
                                                disabled={isPending}
                                            />
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
                                            <Input
                                                {...field}
                                                placeholder="johndoe1"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {user?.isOAuth === false && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="johndoe@example.com"
                                                        type="email"
                                                        disabled={isPending}
                                                    />
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
                                                    <Input
                                                        {...field}
                                                        placeholder="******"
                                                        type="password"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="******"
                                                        type="password"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Influencer || Dog Lover"
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* {user?.isOAuth === false && (
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable two factor authentication for your account
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )} */}
                        </div>
                        <Button
                            disabled={isPending}
                            type="submit"
                        >
                            {isPending && <ClipLoader color="white" size={20} className="mr-2" />} Save
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card >
    );
}

export default SettingsPage;