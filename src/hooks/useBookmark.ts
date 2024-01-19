import React, { useCallback, useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { bookmarkPhotoAtom } from '@/atoms/bookmark'

export default function useBookmark(photoId?: string) {
    const [bookmartPhotos, setBookmartPhotos] = useRecoilState(bookmarkPhotoAtom);

    const addBookmark = useCallback((id: string) => {
        setBookmartPhotos(oldVal => [...oldVal, id])
    }, [])

    const removeBookmark = useCallback((id: string) => {
        setBookmartPhotos(oldVal => oldVal.filter(item => item !== id))
    }, [])

    const isLiked = useMemo(() => {
        return bookmartPhotos.some(item => item === photoId)
    }, [bookmartPhotos, photoId])

    const toggleBookmark = useCallback(() => {
        if (!photoId) return null;
        
        if (isLiked) removeBookmark(photoId)
        else addBookmark(photoId)
    }, [isLiked, photoId])

    return {bookmartPhotos, toggleBookmark, isLiked}
}
