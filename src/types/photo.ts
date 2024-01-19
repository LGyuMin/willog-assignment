import { Full } from 'unsplash-js/dist/methods/photos/types';

export interface IPhoto extends Full {
    downloads: number;
    liked_by_user: boolean;
    tags: {
        type: string;
        title: string;
    }[]

}

export interface Photo {
    id: number;
    width: number;
    height: number;
    alt_description: string;
    urls: { 
        large: string; 
        regular: string; 
        raw: string; 
        small: string;
        thumb: string;
    };
    color: string | null;
    user: {
        username: string;
        name: string;
    };
};