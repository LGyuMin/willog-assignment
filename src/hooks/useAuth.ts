import React, { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

import { accessToken } from '@/atoms/authAtom'

export default function useAuth(redirect_url: string) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const code = searchParams.get('code')
    const [token, setToken] = useRecoilState(accessToken)

    const checkAuth = useCallback(() => {
        if (token === '' && !code) {
            if (confirm('로그인이 필요한 작업입니다. 로그인 하시겠습니까?')) {
                window.location.href = `https://unsplash.com/oauth/authorize/?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}&redirect_uri=${redirect_url}&response_type=code&scope=public+write_likes`
            } else {
                router.back()
            }
        }
    }, [token, code])

    useEffect(() => {
        if (pathname === '/bookmark') {
            checkAuth();
        }

        if (token === '' && code) {
            const option = {
                method: 'POST',
                body: JSON.stringify({
                    client_id: process.env.NEXT_PUBLIC_ACCESS_KEY,
                    client_secret: process.env.NEXT_PUBLIC_SECRET_KEY,
                    redirect_uri: 'http://localhost:3000/',
                    code,
                    grant_type: 'authorization_code'
                })
            }

            fetch('https://unsplash.com/oauth/token', option)
            .then(res => {
                if (res.ok) {
                    console.log(res)
                } else {
                    console.log(res)
                    throw Error
                }
            })
            .catch(err => {
                console.log(err)
                alert('인증에 오류가 발생했습니다. 관리자에게 문의하세요.')
            })
        }
    }, [token, code, pathname])
    
}
