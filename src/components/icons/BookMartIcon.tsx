import React from 'react'
import classNames from 'classnames'

const SIZE = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8',
}

export default function BookMartIcon({
    size,
    isLiked,
}: {
    size: 'small' | 'medium' | 'large';
    isLiked?: boolean;
}) {
    return (
        <svg className={classNames(SIZE[size], {liked: isLiked})}  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" fill={isLiked ? 'red' : 'none'} />
        </svg>
    )
}
