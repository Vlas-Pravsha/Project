import type { Metadata } from 'next'
import { openSans, roboto, yellowTail } from '@/fonts/fonts'
import { constructMetadata } from '@/lib/utils'

import './globals.css'

export const metadata: Metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${roboto.variable} ${yellowTail.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  )
}
