'use client'

import { useEffect, useState } from 'react'

import Photo from '@/components/Photo'
import NoResult from '@/components/NoResult'
import PhotoList from '@/components/PhotoList'

import useUnplash from '@/hooks/useUnplash'

import { IPhoto } from '@/types/photo'

const navItemClassName = 'text-sm text-gray-500 pb-1 box-border'
const active = '!text-black border-black border-b-2'

export default function page() {
    const { users } = useUnplash()
    const [photoList, setPhotoList] = useState<IPhoto[] | null>(null)
    const [total, setTotal] = useState(0)
    useEffect(() => {
        users.getLikes({
            username: 'gyumin_047',
            page: 1,
            perPage: 10
        })
        .then(res => {
            if (res.type === 'success') {
                setTotal(res.response.total)
                setPhotoList(res.response.results as IPhoto[]);
            }
        })
    }, [])
    return (
        <main>
            <div className='w-full mt-4 flex justify-center items-center'>
                <ul className='flex justify-center items-center gap-6'>
                    <li className={navItemClassName}>사진</li>
                    <li className={`${navItemClassName} ${active}`}>좋아요</li>
                    <li className={navItemClassName}>컬렉션</li>
                    <li className={navItemClassName}>통계</li>
                </ul>
            </div>
            {
                    photoList === null || photoList!.length === 0
                ?
                    <NoResult />
                :
                    <PhotoList photos={photoList} type='bookmark' />
            }
        </main>
    )
}
