import { cn } from '@/lib/utils'
import { Clock4 } from 'lucide-react'
import React from 'react'

import type { FC, HTMLAttributes, ImgHTMLAttributes, PropsWithChildren } from 'react'

const CardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={cn('max-w-md p-5 flex flex-col justify-center items-center bg-gray-darkest  rounded-lg gap-5')}>
      {children}
    </div>
  )
}

function CardHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('w-full flex justify-between items-center', className)} {...props}>
      {children}
    </div>
  )
}

function CardTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h6 className={cn('text-lg font-semibold', className)} {...props}>
      {children}
    </h6>
  )
}

function CardDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-gray-400 text-sm font-normal', className)} {...props}>
      {children}
    </p>
  )
}

interface CardImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

function CardImage({ src, alt, className, ...props }: CardImageProps) {
  return (
    <img
      className={cn('', className)}
      width={408}
      height={272}
      src={src}
      alt={alt}
      {...props}
    />
  )
}

function CardDeadlines({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div className={cn(' text-[#5b36a0] bg-purple-300 font-medium rounded-lg flex items-center justify-center text-sm px-3 py-1 gap-1', className)} {...props}>
      <Clock4 className="w-4 h-4" color="#5b36a0" />
      {children}
    </div>
  )
}

const Cardomponent: FC<PropsWithChildren> = ({
  children,
  ...layoutProps
}) => {
  return (
    <CardLayout {...layoutProps}>
      {children}
    </CardLayout>
  )
}

export const Card = Object.assign(Cardomponent, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Image: CardImage,
  Deadlines: CardDeadlines,
})
