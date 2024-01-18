import { atom } from 'recoil';

export const bookmarkPhotoAtom = atom<string[]>({
    key: 'boommark_photo_atom',
    default: []
})