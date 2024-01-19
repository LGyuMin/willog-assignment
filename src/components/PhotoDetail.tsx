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
import useBookmark from '@/hooks/useBookmark'

const descTitle = 'text-gray-400 font-bold text-sm'
const descDetail = 'font-bold text-sm'

export default function PhotoDetail({ 
    photoId,
    isModal
}: { 
    photoId: string;
    isModal: boolean;
}) {
    const router = useRouter()
    const [photoInfo, setPhotoInfo] = useState<IPhoto | null>(null)
    const { isLiked, toggleBookmark } = useBookmark(photoId)
    const { photos } = useUnplash()

    const closeModal = useCallback(() => {
        router.back()
    }, [router])

    useEffect(() => {
        photos.get({ photoId })
        .then(res => {
            setPhotoInfo(res.response as IPhoto)
        })
    }, [photoId])

    const dateDiff = useMemo(() => {
        if (!photoInfo) return null

        const today = dayjs()
        const diff = today.diff(photoInfo.created_at, 'd')
        
        return diff === 0 ? '오늘 게시됨' : `${diff}일 전 개시됨`

    }, [photoInfo])

    if (photoInfo === null) return null

    return (
        <div className='w-[600px] bg-white mx-auto rounded-lg p-3 flex flex-col gap-5'>
            <div className='flex items-center'>
                {
                    isModal
                    &&
                    <button className='flex-none mr-2' onClick={closeModal}>
                        <CloseIcon />
                    </button>
                }

                <p className='mr-auto text-lg font-bold'>
                    { photoInfo.user.name }
                </p>

                <span onClick={toggleBookmark} className='cursor-pointer'>
                    <BookMartIcon size='large' isLiked={isLiked} />
                </span>

                <button className='ml-2 btn'>다운로드</button>
            </div>
            <div className='w-full h-[400px] relative'>
                <Image
                    className='object-contain'
                    src={photoInfo.urls.regular}
                    alt={photoInfo.alt_description || '사진'}
                    fill
                    sizes='(max-width: 768px) 90vw, (max-width: 1200px) 50vw'
                />
            </div>
            <div className='flex flex-row gap-8'>
                <div>
                    <p className={descTitle}>이미지 크기</p>
                    <p className={descDetail}>{ `${photoInfo.width} X ${photoInfo.height}` }</p>
                </div>
                <div>
                    <p className={descTitle}>업로드</p>
                    <p className={descDetail}>{ dateDiff }</p>
                </div>
                <div>
                    <p className={descTitle}>다운로드</p>
                    <p className={descDetail}>{ photoInfo.downloads.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</p>
                </div>
            </div>

            {
                photoInfo.tags.length > 0
                &&
                <div className='flex flex-wrap gap-1'>
                    {
                        photoInfo.tags.map((tag, index) => (
                            <Tag key={index} tag={tag.title} />
                        ))
                    }
                </div>
            }
        </div>
    )
}
