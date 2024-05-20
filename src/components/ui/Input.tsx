import { cn } from '@/utils/cn'
import { cva } from 'class-variance-authority'
import * as React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const inputVariants = cva(
  'border border-[#E0E0E0] rounded-[33px] w-80 h-16 pr-4 pl-8',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      error: {
        true: 'border-red-500 focus:ring-red-500',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants(), className)}
        ref={ref}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
