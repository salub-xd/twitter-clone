import React from 'react'

import LoginForm from "@/components/auth/login-form";
import Image from 'next/image';
import { BsTwitterX } from 'react-icons/bs';

const LoginPage = () => {
    return (
        <div className='flex justify-around items-center w-full px-4'>
            <BsTwitterX className='hidden w-96 h-96 rounded-full py-2 px-2 text-white lg:block' />
            <LoginForm />
        </div>
    )
}

export default LoginPage;