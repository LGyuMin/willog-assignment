import { Full } from 'unsplash-js/dist/methods/photos/types';

export interface IPhoto extends Full {
    downloads: number;
    liked_by_user: boolean;
    tags: {
        type: string;
        title: string;
    }[]

}