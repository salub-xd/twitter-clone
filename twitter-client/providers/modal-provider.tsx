'use client';

import React, { useState, useEffect } from 'react'
import { RepostModal } from '@/components/modals/repost-modal';

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <RepostModal />
        </>
    )
}
