'use client'

import { signOut } from '@/app/auth/actions'
import { Button } from '@/components/ui/'
import { useTheme, useUser } from '@/hooks/'

import { Loader2, Menu, Moon, Search, Sun } from 'lucide-react'
import Image from 'next/image'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Profile from '../Profile'

function Header({ setOpenSideBar }: { setOpenSideBar: any }) {
  const { getTheme, toggleTheme, initTheme } = useTheme()
  const [themeDark, setThemeDark] = useState(false)
  const { user, setUser, loading } = useUser()

  useEffect(() => {
    initTheme()
    setThemeDark(getTheme() === 'dark')
  }, [])

  const handleToggleTheme = () => {
    toggleTheme()
    setThemeDark(!themeDark)
  }

  const handleSignOut = async () => {
    await signOut()
    setUser(null)
  }

  return (
    <div className="bg-gray800 fixed top-0 left-0 right-0 z-10 border-b border-gray100Opacity">
      <div className="flex items-center justify-between p-3 px-6 mx-auto">
        <div className="flex items-center gap-8">
          <button onClick={() => setOpenSideBar((prev: boolean) => !prev)} className="p-2 rounded-lg hover:bg-gray700">
            <Menu className="w-6 h-6 text-gray500Icon" />
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
              <h2 className="text-2xl font-bold">DashBoard</h2>
            </div>
          </Link>
          <div className="flex items-center border border-gray100Opacity bg-gray700 rounded-lg px-2 py-1">
            <Search className="w-5 h-5 text-gray500Icon mr-3" />
            <input
              type="text"
              className="bg-gray700 text-gray500 placeholder:text-gray500 outline-none w-64"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleToggleTheme} className="p-2 rounded-lg hover:bg-gray700">
            {themeDark
              ? <Sun className="w-6 h-6 text-gray500Icon" />
              : <Moon className="w-6 h-6 text-gray500Icon" />}
          </button>
          {loading
            ? <Loader2 className="w-8 h-8 animate-spin" />
            : user
              ? <Profile handleSignOut={handleSignOut} user={user} />
              : (
                  <Link href="/auth/sign-up">
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
