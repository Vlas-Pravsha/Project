import Footer from '@/components/layout/Footer'
import { ChevronRight, Home } from 'lucide-react'
import React from 'react'

const componentClass = 'p-8 bg-gray-darkest border border-opacity-medium rounded-lg'

function ProfilePage() {
  return (
    <div className="p-4 w-full">
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Home />
          Home
        </div>
        <ChevronRight />
        Profile
      </div>
      <h2 className="text-2xl font-semibold my-6">All products</h2>
      <div className="flex gap-4 my-4 w-full">
        <div className="flex flex-col gap-4  w-4/12">
          <div className={componentClass}></div>
          <div className={componentClass}></div>
        </div>
        <div className="flex flex-col gap-4 w-8/12">
          <div className={componentClass}></div>
          <div className={componentClass}></div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProfilePage
