'use client'

import { useState } from 'react'
import styles from './MainLayout.module.css'
import Sidebar from '@/components/NavBar'
import Header from '@/components/Header'

function MainLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header setOpen={setOpen} />
      </div>
      <div className={styles.nav}>
        <Sidebar open={!open} />
      </div>
      <div className={styles.app}>
        <div>Hello World!</div>
      </div>
    </div>
  )
}

export default MainLayout
