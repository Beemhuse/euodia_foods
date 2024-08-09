import HomeLayout from '@/components/layout/HomeLayout'
import Dishes from '@/components/menu-components/Dishes'
import Category from '@/components/reusables/category/page'
import React from 'react'

export default function page() {
  return (
    <HomeLayout>

      <div className='bg-white min-h-screen border border-t-2'>
        <h1 className="text-center font-bold text-4xl text-green-600 mb-5 pt-5">
          Menu
        </h1>
        <div className='container mx-auto'>
          <Category />
        </div>
        <Dishes />
      </div>
    </HomeLayout>
  )
}
