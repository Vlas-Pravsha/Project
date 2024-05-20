import { cn } from '@/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'
import Image from 'next/image'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlined'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  arrow?: boolean
}

const buttonVariants = cva(
  'rounded-2xl py-[26px] px-[39px] flex flex-row justify-center gap-2.5 items-center min-w-[220px]',
  {
    variants: {
      variant: {
        primary: 'bg-yellow text-greenDark',
        secondary: 'bg-greenDark text-white',
        outlined: 'bg-white text-greenDark border border-greenDark',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base font-medium py-5 px-7',
        lg: 'text-lg font-semibold py-5 px-9',
        xl: 'text-xl font-bold',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'xl',
    },
  },
)

const Button = ({
  children,
  type,
  className,
  variant,
  size,
  arrow,
  ...props
}: ButtonProps & VariantProps<typeof buttonVariants>) => {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {arrow && <Image src="/Aerrow.svg" alt="Arrow" width={19} height={19} />}
    </button>
  )
}

export default Button
