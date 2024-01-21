import React, { useCallback, useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { bookmarkPhotoAtom } from '@/atoms/bookmark'

import { IPhoto } from '@/types/photo'

export default function useBookmark(photoId?: string) {
    const [bookmartPhotos, setBookmartPhotos] = useRecoilState(bookmarkPhotoAtom);

    const addBookmark = useCallback((photo: IPhoto) => {
        setBookmartPhotos(oldVal => [...oldVal, photo])
    }, [bookmartPhotos])

    const removeBookmark = useCallback((photo: IPhoto) => {
        setBookmartPhotos(oldVal => oldVal.filter(item => item.id !== photo.id))
    }, [])

    const isLiked = useMemo(() => {
        return bookmartPhotos.some(item => item.id === photoId)
    }, [bookmartPhotos, photoId])

    const toggleBookmark = useCallback((photo: IPhoto) => {
        if (!photoId) return;
        
        if (isLiked) removeBookmark(photo)
        else addBookmark(photo)
    }, [isLiked, photoId])

    return {bookmartPhotos, toggleBookmark, isLiked}
}
