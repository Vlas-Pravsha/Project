import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import type { FieldError } from 'react-hook-form'

const labelVariants = cva('w-full flex flex-col gap-2')

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
  VariantProps<typeof labelVariants> {
  errorText?: string
  title?: string
  hasError?: FieldError | undefined
}

function Label({
  className,
  children,
  errorText,
  title,
  hasError,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(labelVariants(), className)}
      {...props}
    >
      {title && <h3 className="text-base leading-5 font-medium">{title}</h3>}
      {children}
      {hasError && (<span className="text-red500 text-xs leading-3 ml-1.5">{errorText}</span>)}
    </label>
  )
}

export { Label }
