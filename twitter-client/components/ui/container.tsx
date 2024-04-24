import React from 'react'

interface ContainerProps {
    children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
    children,
}) => {

    return (
        <div className='flex items-center mx-8 max-w-7xl sm:mx-auto'>
            {children}
        </div>
    )
}
