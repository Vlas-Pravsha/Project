'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { AppWindow, ChevronDown, ChevronRight, Github, LayoutDashboard, Settings } from 'lucide-react'

function Sidebar({open}) {
  const [isOpen, setIsOpen] = useState(false)
  const [crudOpen, setCrudOpen] = useState(false)

  const sidebar = [
    {
      mainTitle: 'Dashboard',
      icon: <LayoutDashboard className="w-6 h-6 text-gray-400" />,
      href: '/',
    },
    {
      mainTitle: 'CRUD',
      icon: <AppWindow className="w-6 h-6 text-gray-400" />,
      subItems: ['Users', 'Products'],
    },
    {
      mainTitle: 'Settings',
      icon: <Settings className="w-6 h-6 text-gray-400" />,
      href: '/settings',
    },
  ]

  interface SideBarType {
    mainTitle: string
    icon: React.ReactElement
    href?: string
    subItems?: string[]
  }

  const NavItem = ({ item }: { item: SideBarType }) => {
    const [subMenuOpen, setSubMenuOpen] = useState(false)

    return (
      <div>
        <div
          className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
          onClick={() => item.subItems && setSubMenuOpen(!subMenuOpen)}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <span className={`${open? "flex": "hidden"} text-gray-300 text-sm font-medium`}>{item.mainTitle}</span>
          </div>
          {item.subItems && (
            subMenuOpen ? <ChevronDown className={`${open? "flex": "hidden"} w-4 h-4 text-gray-400`} /> : <ChevronRight className={`${open? "flex": "hidden"} w-4 h-4 text-gray-400`}  />
          )}
        </div>
        {subMenuOpen && item.subItems && (
          <div className="ml-6 mt-2">
            {item.subItems.map((subItem, index) => (
              <div key={index} className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
                <span className="text-gray-300 text-sm">{subItem}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`${open? "px-6": "px-2"} py-6 duration-300 fixed top-[71px] bottom-0 flex-col border-r border-borderColor bg-gray-800 z-10`}>
      <div className="flex flex-col gap-4 pb-5 border-b border-borderColor">
        {sidebar.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </div>
      <div className="mt-5 p-2 flex items-center gap-3 hover:bg-gray-700 rounded-lg cursor-pointer">
        <Github className="w-6 h-6 text-gray-400" />
        <Link href="https://github.com/Vlas-Pravsha" className={`${open? "flex": "hidden"} text-gray-300 text-sm font-medium`}>
          GitHub Repository
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
