import {
  Open_Sans,
  Roboto,
  Yellowtail,
} from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '500', '700', '900'],
  display: 'swap',
  variable: '--font-roboto',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
})

const yellowTail = Yellowtail({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-yellowtail',
})

export { openSans, roboto, yellowTail }
