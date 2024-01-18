import React, { useCallback } from 'react';
import Link from 'next/link'

import Photo from '@/components/Photo'

import useBookmark from '@/hooks/useBookmark'

import { IPhoto } from '@/types/photo'

function PhotoList({ 
    photos,
    type
}: {
    photos: IPhoto[];
    type: 'list' | 'bookmark'
}) {

    const { bookmartPhotos, addBookmark, removeBookmark } = useBookmark()

    const toggleBookmark = useCallback(() => {}, [])

    
    return (
        <div className='w-3/4 max-w-[1200px] min-w-[350px] mx-auto my-4 flex flex-row flex-wrap gap-2'>
            {
                type === 'list'
                ?
                photos.map(photo => (
                    <Link 
                        key={photo.id}
                        href={`/photo/${photo.id}`} 
                    >
                        <Photo
                            photoId={photo.id}
                            src={photo.urls.small}
                            alt={photo.alt_description || '사진'}
                            type={type}
                        />
                    </Link>
                ))
                :
                photos.map(photo => (
                    <Photo 
                        key={photo.id}
                        photoId={photo.id}
                        src={photo.urls.small}
                        alt={photo.alt_description || '사진'}
                        type={type}
                    />
                ))
            }
        </div>
    )
}

export default React.memo(PhotoList)