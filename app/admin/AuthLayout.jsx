"use client"


import { getCookie } from '@/utils/getCookie'
import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect } from 'react'

export default function AuthLayout({children}) {
    const cookie = getCookie("euodia_token")
const router = useRouter()
useEffect(()=>{
if(!cookie){
return router.push("/")
}
}, [router, cookie])
  return (
    <Fragment>{children}</Fragment>
  )
}
