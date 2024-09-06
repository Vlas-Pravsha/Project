'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from './ui/Button'

function Profile() {
  const [isOpen, setIsOpen] = useState(false)

  const profileArr = [
    {
      id: crypto.randomUUID(),
      title: 'Neil Sims',
      email: 'neil.sims@flowbite.com',
      options: [
        { id: crypto.randomUUID(), text: 'DashBoard', href: '/' },
        { id: crypto.randomUUID(), text: 'Settings', href: '/setting' },
      ],
    },
  ]

  const toggle = () => setIsOpen(!isOpen)

  return (
    <div className="relative">
      <div className="w-8 h-8">
        <Image
          src="/neil-sims.png"
          alt="Profile"
          className="w-full h-full rounded-full cursor-pointer"
          width={30}
          height={30}
          onClick={toggle}
        />
      </div>
      {isOpen && (
        <div className="absolute bg-profileHeaderBg rounded-lg mt-2 -ml-36 p-4 border border-borderColor">
          {profileArr.map(item => (
            <div key={item.id} className="flex flex-col">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <span className="text-sm text-profileTextColor font-semibold mb-2">
                {item.email}
              </span>
              <div className="border-borderColor mb-2" />
              <div className="flex flex-col gap-2">
                {item.options.map(option => (
                  <Link href={option.href} key={option.id}>
                    <div className="text-sm text-profileTextColor px-2 py-1 hover:bg-hoverBg rounded-md cursor-pointer">
                      {option.text}
                    </div>
                  </Link>
                ))}
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="mt-2"
                onClick={() => {
                }}
              >
                Log Out
              </Button>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile
