import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import React from 'react'
import type { FieldError } from 'react-hook-form'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  hasError?: FieldError | undefined
  type?: 'password' | 'text' | 'email' | 'number'
}

const inputVariants = cva(
  'w-full p-2 rounded-md transition-colors duration-200',
  {
    variants: {
      state: {
        default: 'bg-darkGreyBg border-transparent focus:border-darkBlue',
        error: 'bg-darkGreyBg border-red-600 text-red-600 placeholder-red-600',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
)

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, hasError, type = 'text', className, ...rest }, ref) => {
    const state = hasError ? 'error' : 'default'
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputVariants({ state }), className)}
        placeholder={placeholder}
        {...rest}
      />
    )
  },
)

Input.displayName = 'Input'
export default Input
