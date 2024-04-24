import React from 'react'

import RegisterForm from "@/components/auth/register-form";
import { BsTwitterX } from 'react-icons/bs';

const RegisterPage = () => {
    return (
        <div className='flex justify-around items-center w-full px-4'>
            <BsTwitterX className='hidden w-96 h-96 rounded-full py-2 px-2 text-white lg:block' />
            <RegisterForm />
        </div>
    )
}

export default RegisterPage;