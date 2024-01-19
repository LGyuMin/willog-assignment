import React, { useCallback, useMemo } from 'react'
import Image from 'next/image'

import BookMartIcon from '@/components/icons/BookMartIcon'

import useBookmark from '@/hooks/useBookmark';

function Photo({
    photoId,
    src,
    alt,
    type
}: {
    photoId: string;
    src: string;
    alt: string;
    type: 'list' | 'bookmark'
}) {

    const { isLiked, toggleBookmark } = useBookmark(photoId)

    return (
        <div className='relative flex items-center justify-center overflow-hidden w-[278px] h-[278px]'>
            <Image
                className='object-contain scale-150 hover:scale-[1.7] transition ease-in-out'
                src={src}
                alt={alt}
                fill
                sizes='(max-width: 768px) 90vw, (max-width: 1200px) 50vw'
                priority
            />
            <span 
                className='absolute bottom-1 right-1 text-white cursor-pointer'
                { ...(type === 'bookmark' && { onClick: toggleBookmark }) }
            >
                <BookMartIcon
                    size='medium' 
                    isLiked={isLiked} 
                />
            </span>
        </div>
    )
}

export default React.memo(Photo)