import MainLayout from '@/components/layout/MainLayout'
import type { ReactNode } from 'react'

function layout({ children }: { children: ReactNode }) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  )
}

export default layout
