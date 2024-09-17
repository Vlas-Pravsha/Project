import { ThemeProvider } from '@/contexts/'
import { openSans, roboto, yellowTail } from '@/fonts/fonts'

import { constructMetadata } from '@/lib/utils'
import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={`${openSans.variable} ${roboto.variable} ${yellowTail.variable}`}>
          <main>{children}</main>
        </body>
      </ThemeProvider>
    </html>
  )
}
