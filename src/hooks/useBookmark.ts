import React, { useCallback } from 'react'
import { useRecoilState } from 'recoil'

import { bookmarkPhotoAtom } from '@/atoms/bookmark'

export default function useBookmark() {
    const [bookmartPhotos, setBookmartPhotos] = useRecoilState(bookmarkPhotoAtom);

    const addBookmark = useCallback((id: string) => {
        setBookmartPhotos(oldVal => [...oldVal, id])
    }, [])

    const removeBookmark = useCallback((id: string) => {
        setBookmartPhotos(oldVal => oldVal.filter(item => item !== id))
    }, [])

    return {bookmartPhotos, addBookmark, removeBookmark}
}
