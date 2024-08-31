import { type ClassValue, clsx } from 'clsx'
import type { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function changeTheme() {
  const body = document.querySelector('body')

  const theme = localStorage.getItem('theme')
  if (theme === 'dark') {
    body!.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
  else {
    body!.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }
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
