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
        primary: 'bg-darkBlue text-buttonColorText hover:bg-linkColorBlue',
        secondary: 'bg-componentBg text-lightTextColor border border-borderColor hover:text-buttonColorText',
        delete: 'bg-[#ef4444] text-[#fff] hover:bg-red-700',
      },
      size: {
        sm: 'py-2 px-4 text-sm font-medium',
        md: 'py-2 px-4 text-md font-medium',
        lg: 'py-3 px-6 text-lg font-bold',
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
