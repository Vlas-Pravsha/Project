'use client'

import { useLocalStorage } from '@/hooks'
import styles from '../style/MainLayout.module.css'
import Header from './Header'
import Sidebar from './Sidebar'

function MainLayout({ children }: { children: React.ReactNode }) {
  const [openSideBar, setOpenSideBar] = useLocalStorage<boolean>('sideBar', true)

  const toggleSidebar = () => {
    setOpenSideBar((prev: boolean) => !prev)
  }

  return (
    <div className={`${openSideBar ? styles.openSideBar : styles.closeSideBar} ${styles.container}`}>
      <div className={styles.header}>
        <Header toggleSidebar={toggleSidebar} />
      </div>
      <div className={styles.nav}>
        <Sidebar openSideBar={openSideBar} />
      </div>
      <div className={styles.app}>
        {children}
      </div>
    </div>
  )
}

export default MainLayout
