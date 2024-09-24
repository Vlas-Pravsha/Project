import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import type { FieldError } from 'react-hook-form'

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
  VariantProps<typeof labelVariants> {
  errorText?: string
  title?: string
  hasError?: FieldError | undefined
}

const labelVariants = cva('w-full flex flex-col gap-2')

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
      {title && <h3 className="text-base font-medium">{title}</h3>}
      {children}
      {hasError && (<p className="text-danger text-xs ml-1.5">{errorText}</p>)}
    </label>
  )
}

export { Label }
