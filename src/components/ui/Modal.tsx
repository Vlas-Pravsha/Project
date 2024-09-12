import { cn } from '@/lib/utils'
import type { ModalProps } from '@/hooks/useModal'
import type { FC, HTMLAttributes, PropsWithChildren } from 'react'
import Portal from '../common/Portal'

const ModalLayout: FC<PropsWithChildren<ModalProps>> = ({
  onClose,
  open,
  animation,
  children,
}) => {
  if (!open)
    return null

  return (
    <Portal>
      <div
        onClick={onClose}
        className={cn(
          'h-screen overscroll-none z-50 top-0 left-0 w-full bg-black/30 flex justify-center items-center fixed',
          animation === 'out' ? 'animate-fade-out' : 'animate-fade-in',
        )}
      >
        <div onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </Portal>
  )
}

function ModalText({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p {...props} className={cn('text-gray300 text-lg font-medium', className)}>
      {children}
    </p>
  )
}

function ModalBody({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn('', className)}>
      {children}
    </div>
  )
}

function ModalFooter({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn('flex gap-4 mb-5', className)}>
      {children}
    </div>
  )
}

function ModalContent({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn('w-[425px] flex flex-col gap-4 bg-gray800 rounded-lg p-4', className)}>
      {children}
    </div>
  )
}

const ModalComponent: FC<PropsWithChildren<ModalProps>> = ({
  children,
  ...layoutProps
}) => {
  return <ModalLayout {...layoutProps}>{children}</ModalLayout>
}

export const Modal = Object.assign(ModalComponent, {
  Text: ModalText,
  Body: ModalBody,
  Footer: ModalFooter,
  Content: ModalContent,
})
