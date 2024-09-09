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
  'w-full p-2 rounded-md',
  {
    variants: {
      state: {
        default: 'bg-gray700 border-[transparent] border-2 focus:outline-none focus:border-blue600',
        error: 'bg-gray700 border-red500 border-2 text-red500 placeholder-red500 hover:outline-none',
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
export { Input }
