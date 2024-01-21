import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'

import RecoilRootWrapper from '@/components/RecoilRootWrapper'
import BookMartIcon from '@/components/icons/BookMartIcon'

import './globals.css'
import logo from '/public/logo.png'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '윌로그 프론트엔드 과제',
    description: '윌로그 프론트엔드 과제 made by Gyumin',
}

export default function RootLayout({
    children,
    modal
}: {
    children: React.ReactNode
    modal: React.ReactNode
}) {
    return (
        <html lang="ko">
            <body className={inter.className}>
                <RecoilRootWrapper>
                    <header className='w-full px-4 py-3 bg-white flex justify-between'>
                        <Link href={'/'} className='flex items-center'>
                            <Image 
                                src={logo}
                                alt='logo'
                                width={100}
                            />
                        </Link>
                        <button className='text-xs text-gray-500 px-2 py-1 bg-gray-300 rounded-md ml-auto font-bold'>사진 제출</button>
                        <Link href={'/bookmark'} className='flex items-center btn text-xs ml-2 font-bold'>
                            북마크
                            <BookMartIcon size='small' />
                        </Link>
                    </header>
                    {children}
                    {modal}
                </RecoilRootWrapper>
            </body>
        </html>
    )
}
