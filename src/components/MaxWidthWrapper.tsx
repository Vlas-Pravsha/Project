import { cn } from '@/utils/cn'
import { ReactNode } from 'react'

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <div className={cn('h-full mx-auto w-full', className)}>{children}</div>
  )
}

export default MaxWidthWrapper
