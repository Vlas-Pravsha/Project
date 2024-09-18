import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Metadata } from 'next'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = 'Crm',
  description = 'Create Crm',
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
