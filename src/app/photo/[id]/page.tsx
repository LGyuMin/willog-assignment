'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import dayjs from 'dayjs'

import Modal from '@/components/Modal'
import BookMartIcon from '@/components/icons/BookMartIcon'
import CloseIcon from '@/components/icons/CloseIcon'
import Tag from '@/components/Tag'

import useUnplash from '@/hooks/useUnplash'

import { IPhoto } from '@/types/photo'

const descTitle = 'text-gray-400 font-bold text-sm'
const descDetail = 'font-bold text-sm'

export default function page({ 
    params
}: {
    params: { id: string }
}) {
    const [photo, setPhoto] = useState<IPhoto | null>(null)
    const { photos } = useUnplash()

    useEffect(() => {
        photos.get({ photoId: params.id })
        .then(res => {
            setPhoto(res.response as IPhoto)
        })
    }, [params])

    const dateDiff = useMemo(() => {
        const today = dayjs()
        const diff = today.diff(photo?.created_at, 'd')
        
        return diff === 0 ? '오늘 게시됨' : `${diff}일 전 개시됨`

    }, [photo])

    if (photo === null) return null

    return (
        <main className='w-[600px] bg-white mx-auto rounded-lg p-3 flex flex-col gap-5'>
            <div className='flex items-center'>
                    <p className='mr-auto text-lg font-bold'>
                        { photo.user.name }
                    </p>

                    {/* <span onClick={() => toggleBookmark(params.id)}>
                        <BookMartIcon size='large' />
                    </span> */}


                    <button className='ml-2 btn'>다운로드</button>
            </div>
            <div className='w-full h-[400px] relative'>
                <Image
                    className='object-contain'
                    src={photo.urls.regular}
                    alt={photo.alt_description || '사진'}
                    fill
                    sizes='(max-width: 768px) 90vw, (max-width: 1200px) 50vw'
                />
            </div>
            <div className='flex flex-row gap-8'>
                <div>
                    <p className={descTitle}>이미지 크기</p>
                    <p className={descDetail}>{ `${photo.width} X ${photo.height}` }</p>
                </div>
                <div>
                    <p className={descTitle}>업로드</p>
                    <p className={descDetail}>{ dateDiff }</p>
                </div>
                <div>
                    <p className={descTitle}>다운로드</p>
                    <p className={descDetail}>{ photo.downloads.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</p>
                </div>
            </div>

            {
                photo.tags.length > 0
                &&
                <div className='flex flex-wrap gap-1'>
                    {
                        photo.tags.map((tag, index) => (
                            <Tag key={index} tag={tag.title} />
                        ))
                    }
                </div>
            }
        </main>
    )
}
