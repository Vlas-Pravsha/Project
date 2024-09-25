import MainLayout from '@/components/layout/MainLayout'
import { UserInfoProvider } from '@/contexts/UserInfoContext'
import type { ReactNode } from 'react'

function layout({ children }: { children: ReactNode }) {
  return (
    <UserInfoProvider>
      <MainLayout>
        {children}
      </MainLayout>
    </UserInfoProvider>
  )
}

export default layout
