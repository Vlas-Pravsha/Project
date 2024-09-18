'use client'

import { Button } from '@/components/ui/'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Error() {
  return (
    <div className="fixed inset-0 w-full h-full bg-blue900 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center h-full px-4">
        <Image
          src="/500.svg"
          alt="Maintenance"
          width="500"
          height="500"
          className="w-[500px] h-[500px]"
        />
        <div className="max-w-[900px] flex flex-col justify-center items-center text-center gap-4">
          <h1 className="text-4xl font-bold md:text-5xl sm:text-2xl">Something has gone seriously wrong</h1>
          <p className="text-lg font-medium text-gray-medium mb-5 sm:text-base">
            It's always time for a coffee break. We should be back by the time you finish your coffee.
          </p>
          <Link href="/">
            <Button variant="primary" size="sm">Go back home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Error
