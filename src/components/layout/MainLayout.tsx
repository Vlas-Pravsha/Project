'use client'

import { useLocalStorage } from '@/hooks'
import styles from '../style/MainLayout.module.css'
import Header from './Header'
import Sidebar from './Sidebar'

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
