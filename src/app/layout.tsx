import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import { openSans, roboto } from '@/font/font'

export const metadata: Metadata = {
  title: 'Organic',
  description: 'Make your life easier',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${roboto.variable}`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
