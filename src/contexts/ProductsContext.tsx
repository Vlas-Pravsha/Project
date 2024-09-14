'use client'

import { createClient } from '@/utils/supabase/client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ProductFormData } from '@/app/products/components/FormModal'
import type { ReactNode } from 'react'

export interface ProductItem extends ProductFormData {
  id: string
}

interface ProductContextType {
  products: ProductItem[]
  addProduct: (data: ProductItem) => Promise<void>
  loading: boolean
  deleteProduct: (id: string) => Promise<void>
}

const supabase = createClient()

const ProductsContext = createContext<ProductContextType | undefined>(undefined)

function ProductsContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<ProductItem[]>([])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from('products').select('*')
      if (error)
        throw error

      setProducts(data || [])
    }
    catch (error: any) {
      console.error('Error fetching products:', error.message)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const addProduct = async (newProduct: ProductItem) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('User is not authenticated')
      }
      const { data, error } = await supabase.from('products').insert([
        {
          name: newProduct.name,
          category: newProduct.category,
          technology: newProduct.technology,
          description: newProduct.description,
          price: newProduct.price,
          discount: 'No',
          user_id: user.id,
        },
      ]).select('*')
      if (error)
        throw error

      setProducts(prevProducts => [...prevProducts, data[0]])
    }
    catch (error: any) {
      console.error('Error adding product:', error.message)
    }
  }

  const deleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase.from('products').delete().match({ id: productId })
      if (error)
        throw error

      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId))
    }
    catch (error: any) {
      console.error('Error deleting product:', error.message)
    }
  }

  async function updateProduct(updateProduct: ProductItem) {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('User is not logged in')
    }

    const { error } = await supabase.from('todos').update(updateProduct).match({
      name: updateProduct.name,
      category: updateProduct.category,
      technology: updateProduct.technology,
      description: updateProduct.description,
      price: updateProduct.price,
      discount: 'No',
      user_id: user.id,
    })

    if (error) {
      throw new Error('Error updating task')
    }
  }

  const value = useMemo(() => ({ updateProduct, addProduct, deleteProduct, loading, products }), [loading, products])

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsContextProvider')
  }
  return context
}

export { ProductsContextProvider, useProducts }
