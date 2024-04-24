'use client';

import React, { useCallback, useState } from 'react'

import { BsTwitterX } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import { useToast } from "@/components/ui/use-toast"
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { graphqlClient } from '@/clients/api';
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user';
import { useCurrentUser } from '@/hooks/user';
import { useQueryClient } from '@tanstack/react-query';


const Home = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const { user } = useCurrentUser();

  // console.log(user);

  if (user) {
    router.push('/home');
  }
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
    <div className='w-full h-full bg-black flex items-center justify-evenly '>
      <BsTwitterX className='hidden w-96 h-96 rounded-full py-2 px-2 text-white lg:block' />
      <div className='flex flex-col items-center w-[400px] gap-y-8 shadow-md sm:w-[500px] lg:items-start'>
        <div className='w-[250px] items-start flex flex-col gap-y-10 sm:w-[350px] lg:w-[450px]'>
          <h1 className='text-white font-bold text-3xl sm:text-4xl lg:text-6xl'>Happening now</h1>
          <p className='text-white font-semibold text-2xl lg:text-3xl'>Join today.</p>
        </div>
        <div className='w-[250px] flex flex-col items-center gap-y-3 sm:w-[350px] lg:items-center'>
          {/* <Button size={'lg'} variant={'outline'} className='w-full flex  text-black font-semibold  rounded-full text-sm sm:text-md'
          > */}
            <GoogleLogin onSuccess={handleClick} size={'large'} shape={'circle'} width={'250px'} />
            {/* {isPending && <ClipLoader color="black" size={20} className="mr-2" />} */}
          {/* </Button> */}
          <div className='w-[300px]  flex flex-col '>
            <p className='text-white font-semibold flex items-center justify-center'>or</p>
          </div>
          <Button size={'lg'} variant={'outline'} className='w-full flex justify-center text-white bg-sky-500 hover:bg-sky-600 hover:text-white font-semibold border-none rounded-full text-sm sm:text-md' onClick={() => router.push('/auth/register')}>
            Create account
          </Button>
        </div>
        <div className='w-[250px] flex flex-col items-center gap-y-4 gap-x-2 sm:w-[350px] lg:items-start'>
          <p className='text-white w-full flex items-start justify-start font-semibold text-md lg:text-lg'>Already have an account?</p>
          <Button size={'lg'} variant={'outline'} className='w-full flex justify-center bg-black bg-transparent hover:bg-sky-100 text-sky-500 hover:text-sky-500 font-semibold rounded-full text-sm sm:text-md ' onClick={() => router.push('/auth/login')}>
            Sign in
          </Button>
        </div>
      </div>
    </div >
  )
}

export default Home;