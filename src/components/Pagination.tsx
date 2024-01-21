import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'

import ArrowIcon from '@/components/icons/ArrowIcon'

interface IPage {
    active: boolean
    href: null | number
    i: string | number
}

interface IPagination {
    block?: number
    total: number
    per_page: number
    current_page: number
    last_page: number
}

const makePagination = (data: IPagination) => {
    const paginatioin: IPage[] = []

    if (!data.block) data.block = 5

    if (data.total > data.per_page) {
        const currentBlock = Math.ceil(data.current_page / data.block),
                startPage = (Math.max(currentBlock, 1) - 1) * data.block + 1,
                lastPage = startPage + data.block - 1,
                lastRoop = Math.min(lastPage, data.last_page)
        
        paginatioin.push({
            i: 'prevPage', 
            href: data.current_page === 1 ? null : Math.max(startPage - 1, 1), 
            active : false 
        })
        
        if (startPage !== 1) {
            paginatioin.push({i: 'more', href: null, active : false })
        }

        for (let i = Math.max(startPage, 1); i <= lastRoop; i++) {
            paginatioin.push({ 
                i: i, 
                href : data.current_page == i ? null : i, 
                active: data.current_page == i ? true : false
            });
        }

        if (lastPage < data.last_page) {
            paginatioin.push({i: 'more', href: null, active : false })
            paginatioin.push({  
                i: data.last_page, 
                href: data.last_page, 
                active : false 
            })
        }

        paginatioin.push({
            i: 'nextPage', 
            href: data.current_page === data.last_page ? null : Math.min(lastPage + 1, data.last_page), 
            active : false 
        })
    }

    return paginatioin
}

function Pagination({
    paginationData,
    onClickPage
}: {
    paginationData: IPagination
    onClickPage: (i: number) => void
}) {
    const pagination = useMemo(() => makePagination(paginationData), [paginationData])

    const clickPage = useCallback((page: number | null) => {
        if (page) onClickPage(page)
    }, [])

    if (pagination.length < 1) return null

    return (
        <div className='flex gap-1'>
            {
                pagination.map((item, index) => (
                    item.i === 'more'
                    ?
                        <span key={index + 'more'} className='flex items-center mt-[-7px]'>...</span>
                    :
                        <span 
                            key={item.i}
                            className={classNames('page-btn', { 'rotate-180': item.i === 'nextPage', active: item.active, disabled: item.href === null && !item.active })}
                            onClick={() => clickPage(item.href)}
                        >
                            {
                                item.i === 'prevPage' || item.i === 'nextPage' ? <ArrowIcon /> : item.i
                            }
                        </span>
                ))
            }
        </div>
    )
}

export default React.memo(Pagination)