import { AppWindow, Github, Kanban, LayoutDashboard, Settings } from 'lucide-react'
import Link from 'next/link'
import NavItem from '../NavItem'

function Sidebar({ openSideBar }: { openSideBar: boolean }) {
  const sidebar = [
    {
      mainTitle: 'Dashboard',
      icon: <LayoutDashboard className="w-6 h-6" color="var(--gray-100)" />,
      href: '/',
    },
    {
      mainTitle: 'Kanban',
      icon: <Kanban className="w-6 h-6" color="var(--gray-100)" />,
      href: '/kanban',
    },
    {
      mainTitle: 'Products',
      icon: <AppWindow className="w-6 h-6" color="var(--gray-100)" />,
      href: '/products',
    },
    {
      mainTitle: 'Settings',
      icon: <Settings className="w-6 h-6" color="var(--gray-100)" />,
      href: '/settings',
    },
  ]

  return (
    <div className={`${openSideBar ? 'px-6' : 'px-2'} py-6 fixed top-[65px] bottom-0 flex-col bg-gray800 z-10`}>
      <div className="flex flex-col gap-4 pb-5 border-b border-gray100Opacity">
        {sidebar.map((item, index) => (
          <NavItem key={index} item={item} openSideBar={openSideBar} />
        ))}
      </div>
      <div className="mt-5 p-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray700">
        <Github className="w-6 h-6" color="var(--gray-100)" />
        <Link href="https://github.com/Vlas-Pravsha/Project" className={`${openSideBar ? 'flex' : 'hidden'} text-gray100 text-sm font-medium`}>
          GitHub Repository
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
