import MainLayout from '@/components/layout/MainLayout'
import { KanbanContextProvider } from '@/contexts'

import type { ReactNode } from 'react'

function layout({ children }: { children: ReactNode }) {
  return (
    <KanbanContextProvider>
      <MainLayout>
        {children}
      </MainLayout>
    </KanbanContextProvider>

  )
}

export default layout
