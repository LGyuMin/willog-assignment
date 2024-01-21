'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import SearchIcon from '@/components/icons/SearchIcon'
import PhotoList from '@/components/PhotoList'
import Pagination from '@/components/Pagination'
import NoResult from '@/components/NoResult'
import Loading from '@/components/Loading'

import useUnplash from '@/hooks/useUnplash'

import { IPhoto } from '@/types/photo'

export default function Home() {
    const [randomPhoto, setRandomPhoto] = useState<IPhoto | null>(null);
    const [searchParma, setSearchParam] = useState({query: '', page: 1, perPage: 20})
    const [photoList, setPhotoList] = useState<IPhoto[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const { photos, search } = useUnplash()
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

    const searchPhotos = useCallback(() => {
        setSearchParam({query: inputRef.current.value, page: 1, perPage: 20})
    }, [inputRef])

    const searchOnKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) return
        
        if (e.key === 'Enter') searchPhotos()
    }, [inputRef])

    const setPage = useCallback((page: number) => {
        setSearchParam(oldVal => ({...oldVal, page}))
    }, [])

    useEffect(() => {
        photos.getRandom({
            query: 'photo',
            orientation: 'landscape'
        })
        .then(res => {
            if (res.type === 'success') {
                setRandomPhoto(res.response as IPhoto);
            } else {
                console.log(res)
                throw Error
            }
        })
        .catch(() => {
            console.log('사진 불러오는데 실패했습니다. 관리자에게 문의하세요.')
        });
    }, [])

    useEffect(() => {
        setIsLoading(true)

        let response

        if (searchParma.query.trim() === '') {
            response = photos.list(searchParma)
        } else {
            response = search.getPhotos(searchParma)
        }

        response.then(res => {
            if (res.type === 'success') {
                setTotal(res.response.total)
                setPhotoList(res.response!.results as IPhoto[]);
            } else {
                console.log(res)
                throw Error
            }
            setIsLoading(false)
        })
        .catch(() => {
            console.log('사진 목록을 가져오는데 문제가 생겼습니다. 관리자에게 문의하세요.')
            setIsLoading(false)
        });

    }, [searchParma]);

    return (
        <main>
            { isLoading && <Loading /> }
            <div className='w-full h-[350px] bg-slate-500 overflow-hidden relative'>
                {
                    randomPhoto
                    &&
                    <Image
                        className='z-10 object-cover'
                        src={randomPhoto.urls.full}
                        alt={randomPhoto.alt_description || '사진'}
                        fill
                        sizes='100vw'
                        priority
                    />
                }
                <div className='w-full h-full bg-black/40 absolute top-0 left-0 z-20 flex flex-col justify-center items-center'>
                    <div className='w-4/5 md:w-[600px] flex flex-col gap-2'>
                        <h1 className='font-bold text-white text-6xl mb-2'>Will Photo</h1>
                        <p className='text-white'>인터넷의 시각자료 출처입니다.</p>
                        <p className='text-white'>모든 지역에 있는 크리에이터들의 지원을 받습니다.</p>
                        <div className='flex gap-2 bg-white p-4 rounded-lg mt-2'>
                            <input 
                                type="text" 
                                className='outline-none text-sm w-full'
                                placeholder='고해상도 이미지 검색'
                                onKeyDown={searchOnKeyDown}
                                ref={inputRef}
                            />
                            <button onClick={searchPhotos}>
                                <SearchIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {
                    photoList === null || photoList!.length === 0
                ?
                    <NoResult />
                :
                    <PhotoList photos={photoList} type='list' />
            }

            <div className='w-3/4 max-w-[1200px] min-w-[350px] mx-auto mb-8'>
                <Pagination
                    paginationData={{
                        current_page: searchParma.page,
                        total: total,
                        per_page: 20,
                        last_page: Math.ceil(total / 20)
                    }}
                    onClickPage={setPage}
                />
            </div>
        </main>
    )
}
