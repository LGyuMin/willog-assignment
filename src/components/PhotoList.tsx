import React from 'react';
import Link from 'next/link'

import Photo from '@/components/Photo'

import { IPhoto } from '@/types/photo'

function PhotoList({ 
    photos,
    type
}: {
    photos: IPhoto[]
    type: 'list' | 'bookmark'
}) {
    return (
        <div className='w-3/4 max-w-[1200px] min-w-[350px] mx-auto my-4 flex flex-row flex-wrap gap-2'>
            {
                type === 'list'
                ?
                photos.map(photo => (
                    <Link 
                        key={photo.id}
                        href={`/photo/${photo.id}`}
                        scroll={false}
                    >
                        <Photo
                            photo={photo}
                            type={type}
                        />
                    </Link>
                ))
                :
                photos.map(photo => (
                    <Photo 
                        key={photo.id}
                        photo={photo}
                        type={type}
                    />
                ))
            }
        </div>
    )
}

export default React.memo(PhotoList)