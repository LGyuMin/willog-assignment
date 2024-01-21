'use client'

import NoResult from '@/components/NoResult'
import PhotoList from '@/components/PhotoList'

import useBookmark from '@/hooks/useBookmark'

const navItemClassName = 'text-sm text-gray-500 pb-1 box-border'
const active = '!text-black border-black border-b-2'

export default function BookmarkPage() {
    const { bookmartPhotos } = useBookmark()

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
                    bookmartPhotos.length === 0
                ?
                    <NoResult />
                :
                    <PhotoList photos={bookmartPhotos} type='bookmark' />
            }
        </main>
    )
}
