import { ProductsContextProvider } from '@/contexts/ProductsContext'

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
