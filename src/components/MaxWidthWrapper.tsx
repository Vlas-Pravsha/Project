import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('h-full mx-auto w-full', className)}>{children}</div>
  )
}

export default MaxWidthWrapper
