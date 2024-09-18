import { AppWindow, Kanban, LayoutDashboard, Settings } from 'lucide-react'

export const sidebarMenu = [
  {
    mainTitle: 'Dashboard',
    icon: <LayoutDashboard className="w-6 h-6" />,
    href: '/',
  },
  {
    mainTitle: 'Kanban',
    icon: <Kanban className="w-6 h-6" />,
    href: '/kanban',
  },
  {
    mainTitle: 'Products',
    icon: <AppWindow className="w-6 h-6" />,
    href: '/products',
  },
  {
    mainTitle: 'Settings',
    icon: <Settings className="w-6 h-6" />,
    href: '/settings',
  },
]
