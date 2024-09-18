import { sidebarMenu } from '@/constants/sidebar'
import { Github } from 'lucide-react'
import Link from 'next/link'
import SidebarItem from '../SidebarItem'

function Sidebar({ openSideBar }: { openSideBar: boolean }) {
  return (
    <div className={`${openSideBar ? 'px-6' : 'px-2'} py-6 fixed top-[65px] bottom-0 flex-col border-r border-opacity-medium bg-gray-darkest  z-10`}>
      <div className="flex flex-col gap-4 pb-5 border-b border-opacity-medium">
        {sidebarMenu.map((item, index) => (
          <SidebarItem key={index} item={item} openSideBar={openSideBar} />
        ))}
      </div>
      <div className="mt-5 p-2 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-gray-dark">
        <Github className="w-6 h-6" />
        <Link href="https://github.com/Vlas-Pravsha/Project" className={`${openSideBar ? 'flex' : 'hidden'} text-gray-light text-sm font-medium`}>
          GitHub Repository
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
