import { atom } from 'recoil'
import { IPhoto } from '@/types/photo'

export const bookmarkPhotoAtom = atom<IPhoto[]>({
    key: 'boommark_photo_atom',
    default: []
})