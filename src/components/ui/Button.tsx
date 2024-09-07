import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'third'
  size?: 'sm' | 'md' | 'lg'
}

const buttonVariants = cva(
  'rounded-lg text-sm font-medium transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'bg-darkBlue text-buttonColorText hover:bg-linkColorBlue',
        secondary: 'bg-componentBg text-lightTextColor border border-borderColor hover:text-buttonColorText',
        third: 'bg-darkBlue text-buttonColorText hover:bg-linkColorBlue',
      },
      size: {
        sm: 'py-2 px-4',
        md: 'py-3 px-6',
        lg: 'py-4 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

function Button({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps & VariantProps<typeof buttonVariants>) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  )
}

export default Button
