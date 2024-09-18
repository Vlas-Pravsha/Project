'use client'

import Link from 'next/link'
import { useState } from 'react'

interface SideBarType {
  mainTitle: string
  icon: React.ReactElement
  href?: string
}

function NavItem({ item, openSideBar }: { item: SideBarType, openSideBar: boolean }) {
  const [subMenuOpen, setSubMenuOpen] = useState(false)

  return (
    <Link
      href={`${item.href}`}
      className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-dark"
      onClick={() => setSubMenuOpen(!subMenuOpen)}
    >
      <div className="flex items-center gap-3">
        {item.icon}
        <span className={`${openSideBar ? 'flex' : 'hidden'} text-gray-light text-md font-medium`}>{item.mainTitle}</span>
      </div>
    </Link>
  )
}

export default NavItem
