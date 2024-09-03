'use client'

import { useState } from 'react'
import Sidebar from '@/components/NavBar'
import Header from '@/components/Header'

export default function Home() {
  const [open, setOpen] = useState(false)

  return (
    <section>
      <Header setOpen={setOpen}></Header>
      <Sidebar open={!open} />
    </section>
  )
}
