'use client'

import React, { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ClipLoader } from 'react-spinners';
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '../ui/use-toast'
import { graphqlClient } from '@/clients/api'
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/navigation'

export const Social = () => {

  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const queryClient = useQueryClient();

  const { toast } = useToast();
  const handleClick = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;

    if (!googleToken) {
      return toast({
        variant: "destructive", title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
    const { verifyGoogleToken } = await graphqlClient.request(verifyUserGoogleTokenQuery, { token: googleToken });
    toast({ variant: "default", title: "Successfully logged!" });

    console.log(verifyGoogleToken);
    if (verifyGoogleToken) {
      window.localStorage.setItem("twitter-token", verifyGoogleToken);
      router.push('/home');
    }

    await queryClient.invalidateQueries({ queryKey: ['current-user'] });

  }, [toast, queryClient, router]);

  return (
    <div className='flex items-center justify-center sm:w-[350px] lg:items-center'>
      <GoogleLogin onSuccess={handleClick} size={'large'} width={'350px'} />
    </div>
  )
}