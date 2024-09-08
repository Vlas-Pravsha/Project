'use client'

import { useLocalStorage } from '@/hooks'
import Header from './Header'
import styles from './MainLayout.module.css'
import Sidebar from './NavBar'

function MainLayout({ children }: { children: React.ReactNode }) {
  const [openSideBar, setOpenSideBar] = useLocalStorage<boolean>('sideBar', true)

  return (
    <div className={`${openSideBar ? styles.openSideBar : styles.closeSideBar} ${styles.container}`}>
      <div className={styles.header}>
        <Header setOpenSideBar={setOpenSideBar} />
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
