import { AppWindow, Github, LayoutDashboard, Settings } from 'lucide-react'
import Link from 'next/link'
import NavItem from '../NavItem'

function Sidebar({ openSideBar }: { openSideBar: boolean }) {
  const sidebar = [
    {
      mainTitle: 'Dashboard',
      icon: <LayoutDashboard className="w-6 h-6 text-gray-400" />,
      href: '/',
    },
    // {
    //   mainTitle: 'CRUD',
    //   icon: <AppWindow className="w-6 h-6 text-gray-400" />,
    //   href: '/',
    // },
    {
      mainTitle: 'Settings',
      icon: <Settings className="w-6 h-6 text-gray-400" />,
      href: '/settings',
    },
  ]

  return (
    <div className={`${openSideBar ? 'px-6' : 'px-2'} py-6 fixed top-[65px] bottom-0 flex-col bg-gray-800 z-10`}>
      <div className="flex flex-col gap-4 pb-5 border-b border-borderColor">
        {sidebar.map((item, index) => (
          <NavItem key={index} item={item} openSideBar={openSideBar} />
        ))}
      </div>
      <div className="mt-5 p-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-700">
        <Github className="w-6 h-6 text-gray-400" />
        <Link href="https://github.com/Vlas-Pravsha/Project" className={`${openSideBar ? 'flex' : 'hidden'} text-gray-300 text-sm font-medium`}>
          GitHub Repository
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
