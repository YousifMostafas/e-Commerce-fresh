"use client"
import AppButton from '@/components/AppButton/AppButton'
import React from 'react'
import { HandleUpdateCount } from './updateCount.action'

export default function UpdateCount({children , prodid , count , disabled}:any) {
   async  function  updateCounter(){
await HandleUpdateCount(prodid , count)
    }
  return (
<AppButton
  onClick={updateCounter}
  disabled={disabled}
  className="h-8 w-8 rounded-lg bg-main-color shadow-sm flex items-center justify-center text-white hover:bg-emerald-700 disabled:pointer-events-auto! disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-main-color transition-all"
  aria-label="Update quantity"
>
  {children}
</AppButton>
  )

}
