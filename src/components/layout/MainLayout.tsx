'use client'

import { useState } from 'react'
import styles from './MainLayout.module.css'
import Header from './Header'
import Sidebar from './NavBar'

function MainLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`${open ? styles.shortTab : styles.largeTap} ${styles.container}`}>
      <div className={styles.header}>
        <Header setOpen={setOpen} />
      </div>
      <div className={styles.nav}>
        <Sidebar open={!open} />
      </div>
      <div className={styles.app}>
        {children}
      </div>
    </div>
  )
}

export default MainLayout
