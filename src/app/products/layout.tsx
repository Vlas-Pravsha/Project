import { ProductsContextProvider } from '@/contexts/'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ProductsContextProvider>
      {children}
    </ProductsContextProvider>

  )
}
