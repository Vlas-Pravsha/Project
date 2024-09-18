import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import React from 'react'
import type { FieldError } from 'react-hook-form'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: FieldError | undefined
}

const textareaVariants = cva(
  'w-full p-2 rounded-md border-2 bg-gray-dark',
  {
    variants: {
      variant: {
        default: 'border-transparent focus:outline-none focus:border-blue-600',
        error: 'border-danger text-danger placeholder-danger hover:outline-none',
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
