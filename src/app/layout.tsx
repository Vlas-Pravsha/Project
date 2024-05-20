import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import { openSans, roboto, yellowTail } from '@/fonts/fonts'

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
        className={`${openSans.variable} ${roboto.variable} ${yellowTail.variable}`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
