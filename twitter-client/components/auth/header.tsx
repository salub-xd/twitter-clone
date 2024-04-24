import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'

const font = Poppins({
    subsets: ['latin'],
    weight: '600',
})

interface HeaderProps {
    label: string;
}

export const Header = ({ label }: HeaderProps) => {
    return (
        <div className='w-full flex flex-col justify-center gap-y-4'>
            <p className={cn(' text-black text-2xl', font.className)}>{label}</p>
        </div>
    )
}