import { cn } from '@/lib/utils'
import type { ModalProps } from '@/hooks/useModal'
import type { ComponentProps, FC, PropsWithChildren } from 'react'
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

const ModalText: FC<ComponentProps<'div'>> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={cn('text-gray300 text-lg font-medium', className)}>
      {children}
    </div>
  )
}

const ModalBody: FC<ComponentProps<'div'>> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={cn('w-[425px] bg-gray800 p-4 rounded-lg', className)}>
      {children}
    </div>
  )
}

const ModalFooter: FC<ComponentProps<'div'>> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={cn('flex gap-4 mb-5', className)}>
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

const Modal = Object.assign(ModalComponent, {
  Text: ModalText,
  Body: ModalBody,
  Footer: ModalFooter,
})

export default Modal
