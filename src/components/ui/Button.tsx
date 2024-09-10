import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'delete'
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
        primary: 'bg-blue600 text-white hover:bg-blue500',
        secondary: 'bg-gray800 text-gray500 border border-gray100Opacity hover:text-white',
        delete: 'bg-red500 text-white hover:bg-red-700',
      },
      size: {
        sm: 'h-8 px-4 text-sm font-medium',
        md: 'h-10 px-4 text-md font-medium',
        lg: 'h-12 px-6 text-lg font-bold',
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
