'use client'
import React, { useCallback, useRef, useEffect, MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'

function Modal({ 
    children 
}: { 
    children: React.ReactNode;
}) {
    const router = useRouter()
    const overlay = useRef() as React.MutableRefObject<HTMLDivElement>
    const wrapper = useRef() as React.MutableRefObject<HTMLDivElement>

    const dimissModal = useCallback(() => {
        router.back()
    }, [router])

    const onClick: MouseEventHandler = useCallback((e) => {
        if (e.target === overlay.current || e.target === wrapper.current) {
            if (dimissModal) dimissModal();
        }
    }, [dimissModal, overlay, wrapper])

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') dimissModal()
    },[dimissModal])
    
    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [onKeyDown])

    return (
        <div 
            className='fixed z-50 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60'
            ref={overlay}
            onClick={onClick}
        >
            <div 
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full'
                ref={wrapper}
            >
                {children}
            </div>
        </div>
    )
}

export default React.memo(Modal)