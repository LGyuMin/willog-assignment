import React from 'react'
import Image from 'next/image'

import BookMartIcon from '@/components/icons/BookMartIcon'

import useBookmark from '@/hooks/useBookmark';

import { IPhoto } from '@/types/photo'

function Photo({
    photo,
    type
}: {
    photo: IPhoto
    type: 'list' | 'bookmark'
}) {

    const { isLiked, toggleBookmark } = useBookmark(photo.id)

    return (
        <div className='relative flex items-center justify-center overflow-hidden w-[278px] h-[278px]'>
            <Image
                className='object-contain scale-150 hover:scale-[1.7] transition ease-in-out'
                src={photo.urls.small}
                alt={photo.alt_description || '사진'}
                fill
                sizes='(max-width: 768px) 90vw, (max-width: 1200px) 50vw'
                placeholder='blur'
                blurDataURL='data:image/gif;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8deLEfwAIGQNbF0JltAAAAABJRU5ErkJggg=='
                priority
            />
            <span 
                className='absolute bottom-1 right-1 text-white cursor-pointer'
                { ...(type === 'bookmark' && { onClick: () => toggleBookmark(photo) }) }
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