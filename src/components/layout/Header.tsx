'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, Moon, Search, Sun, X } from 'lucide-react'
import Profile from '../Profile'
import Button from '../ui/Button'
import { changeTheme } from '@/lib/utils'

function Header({ setOpen }: { setOpen: any }) {
  const user = null
  const [themeDark, setThemeDark] = useState(false)

  const toggleTheme = () => {
    changeTheme()
    setThemeDark(!themeDark)
  }

  return (
    <div className="bg-componentBg fixed top-0 left-0 right-0 z-10 border-b border-borderColor">
      <div className="flex items-center justify-between p-3 px-6 mx-auto">
        <div className="flex items-center gap-8">
          <button onClick={() => setOpen((prev: boolean) => !prev)} className="p-2 rounded-lg hover:bg-darkGreyBg">
            <Menu className="w-6 h-6 text-iconsColor" />
          </button>
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Icon"
                className="w-8 h-8"
                width="30"
                height="30"
              />
              <h2 className="text-2xl font-bold text-gray-400">DashBoard</h2>
            </div>
          </Link>
          <div className="flex items-center border border-borderColor bg-darkGreyBg rounded-lg px-2 py-1">
            <Search className="w-5 h-5 text-iconsColor mr-3" />
            <input
              type="text"
              className="bg-darkGreyBg text-lightTextColor placeholder:text-lightTextColor outline-none w-64"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-darkGreyBg">
            {themeDark
              ? (
                  <Moon className="w-6 h-6 text-iconsColor" />
                )
              : (
                  <Sun className="w-6 h-6 text-iconsColor" />
                )}
          </button>
          {user
            ? <Profile />
            : (
                <Link href="/sign-up">
                  <Button variant="secondary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              )}
        </div>
      </div>
    </div>
  )
}

export default Header
