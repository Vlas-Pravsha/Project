'use client'

import { useDebounce } from '@/hooks'
import { getErrorMessage } from '@/types'
import { createClient } from '@/utils/supabase/client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ProductFormData } from '@/app/products/components/FormModal'
import type { ReactNode } from 'react'

export interface ProductItem extends ProductFormData {
  isChecked: boolean
  id: string
}

interface ProductContextType {
  products: ProductItem[]
  filteredProducts: ProductItem[]
  addProduct: (data: ProductItem) => Promise<void>
  updateProduct: (data: ProductItem) => Promise<void>
  loading: boolean
  deleteProduct: (id: string) => Promise<void>
  handleCheckboxChange: (event: any) => void
  handleSearchChange: (event: any) => void
}

const supabase = createClient()

const ProductsContext = createContext<ProductContextType | undefined>(undefined)

function ProductsContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearch = useDebounce<string>(searchValue)
  const [products, setProducts] = useState<ProductItem[]>([])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from('products').select('*')
      if (error)
        throw error

      setProducts(data || [])
    }
    catch (error) {
      const { message } = getErrorMessage(error)
      console.error('Error fetching products:', message)
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
          discount: newProduct.discount,
          user_id: user.id,
        },
      ]).select('*')
      if (error)
        throw error

      setProducts(prevProducts => [...prevProducts, data[0]])
    }
    catch (error) {
      const { message } = getErrorMessage(error)
      console.error('Error adding product:', message)
    }
  }

  const deleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase.from('products').delete().match({ id: productId })
      if (error)
        throw error

      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId))
    }
    catch (error) {
      const { message } = getErrorMessage(error)
      console.error('Error deleting product:', message)
    }
  }

  async function updateProduct(updateProduct: ProductItem) {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('User is not logged in')
    }

    if (!updateProduct.id) {
      throw new Error('Product ID is required for update')
    }

    const { error } = await supabase.from('products').update(updateProduct).match({
      name: updateProduct.name,
      category: updateProduct.category,
      technology: updateProduct.technology,
      description: updateProduct.description,
      price: updateProduct.price,
      discount: updateProduct.discount,
      user_id: user.id,
    })

    if (error) {
      throw new Error('Error updating task')
    }
  }

  const filteredProducts = products.filter(item =>
    item.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  )

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: id, checked } = event.target
    if (id === 'allSelect') {
      const tempProduct = filteredProducts.map(product => ({
        ...product,
        isChecked: checked,
      }))
      setProducts(tempProduct)
    }
    else {
      const tempProduct = filteredProducts.map(product =>
        product.id.toString() === id ? { ...product, isChecked: checked } : product,
      )
      setProducts(tempProduct)
    }
  }

  const value = useMemo(() => ({
    updateProduct,
    addProduct,
    deleteProduct,
    loading,
    products,
    filteredProducts,
    handleCheckboxChange,
    handleSearchChange,
  }), [loading, products, filteredProducts, searchValue])

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
