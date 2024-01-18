import React from 'react'

function Tag({
    tag
}: {
    tag: string;
}) {
    return (
        <div className='p-1 bg-gray-300	 text-gray-500 text-xs rounded-sm font-bold'>{tag}</div>
    )
}

export default React.memo(Tag)