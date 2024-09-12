import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import React from 'react'
import type { FieldError } from 'react-hook-form'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: FieldError | undefined
}

const textareaVariants = cva(
  'w-full p-2 rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-gray700 border-2 border-transparent focus:outline-none focus:border-blue-600',
        error: 'bg-gray700 border-red500 border-2 text-red500 placeholder-red500 hover:outline-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError, rows, className, placeholder, ...props }, ref) => {
    const variant = hasError ? 'error' : 'default'
    return (
      <textarea
        {...props}
        ref={ref}
        className={cn(textareaVariants({ variant }), className)}
        placeholder={placeholder}
        rows={rows}
      />
    )
  },
)

Textarea.displayName = 'Textarea'
export { Textarea }
