import Banner from '@/components/menu-components/Banner'
import Dishes from '@/components/menu-components/Dishes'
import React from 'react'

export default function page() {
  return (
    <div className='bg-white min-h-screen border-2 border-green-500'>
      <Banner />
      <div className='text-center bg-orange-50 py-3 my-4'>
        <p className='text-gray-500'>Our amazing menu spans a wide variety of rice, salads, grilled chicken,Nigerian Soup & much more. Available for 24 hour delivery, 7 days a week</p>
      </div>
      <Dishes />
    </div>
  )
}
