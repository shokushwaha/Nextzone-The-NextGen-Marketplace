import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function PleaseLogin() {
    const router = useRouter();
    useEffect(() => {
        router.push('/login');
    }, []);
    return (
        <></>
    )
}
