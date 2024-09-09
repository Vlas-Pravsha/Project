import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Metadata } from 'next'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = 'Dashboard',
  description = 'Create Dashboard',
  icons = '',
}: {
  title?: string
  description?: string
  icons?: string
} = {}): Metadata {
  return {
    title,
    description,
    icons,
    metadataBase: new URL('http://localhost:3000'),
  }
}
