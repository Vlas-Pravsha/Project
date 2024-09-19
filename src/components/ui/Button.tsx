import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'delete' | 'dashed'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  iconBefore?: React.ReactNode
  iconAfter?: React.ReactNode
}

const buttonVariants = cva(
  'rounded-lg flex items-center justify-center',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-white hover:bg-blue-700',
        secondary: 'bg-gray-darkest text-gray-medium border border-opacity-medium hover:text-white',
        dashed: 'bg-transparent text-gray-500 border-2 border-dashed border-opacity-medium',
        delete: 'bg-danger text-white hover:bg-red-700',
      },
      size: {
        sm: 'py-1.5 px-4 text-sm font-medium',
        md: 'py-2.5 px-4 text-md font-medium',
        lg: 'py-3.5 px-6 text-lg font-bold',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
)

function Button({
  children,
  variant,
  size,
  fullWidth,
  className,
  iconBefore,
  iconAfter,
  ...props
}: ButtonProps & VariantProps<typeof buttonVariants>) {
  return (
    <button className={cn(buttonVariants({ variant, size, fullWidth }), className)} {...props}>
      {iconBefore && <span className="mr-2">{iconBefore}</span>}
      {children}
      {iconAfter && <span className="ml-2">{iconAfter}</span>}
    </button>
  )
}

export { Button }
