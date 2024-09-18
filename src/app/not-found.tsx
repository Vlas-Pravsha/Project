import { Button } from '@/components/ui/'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function NotFoundPage() {
  return (
    <div className="fixed inset-0 w-full h-full bg-blue900 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center h-full px-4">
        <Image
          src="/404.svg"
          alt="Maintenance"
          width="500"
          height="500"
          className="w-[500px] h-[500px]"
        />
        <div className="max-w-[900px] flex flex-col justify-center items-center text-center gap-4">
          <h1 className="text-4xl font-bold md:text-5xl sm:text-2xl">Page not found</h1>
          <p className="text-lg font-medium text-gray-medium mb-5 sm:text-base">
            Oops! Looks like you followed a bad link. If you think this is a
            problem with us, please tell us.
          </p>
          <Link href="/">
            <Button variant="primary" size="sm">Go back home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
