'use client';

import { RecoilRoot } from 'recoil'
import React from 'react'

export default function RecoilRootWrapper({
	children,
}: {
    children: React.ReactNode
}) {
    return <RecoilRoot>{children}</RecoilRoot>
}