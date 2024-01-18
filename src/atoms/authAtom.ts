import { atom } from 'recoil';

export const accessToken = atom({
    key: 'access_token_atom',
    default: ''
})

export const userInfo = atom({
    key: 'user_info_atom',
    default: null
})