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
  loading: boolean
  products: ProductItem[]
  filteredProducts: ProductItem[]
  addProduct: (data: ProductItem) => Promise<void>
  updateProduct: (data: ProductItem, id: string) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  deleteProducts: () => Promise<void>
}

const supabase = createClient()

const ProductsContext = createContext<ProductContextType | undefined>(undefined)

const PRODUCTS_DATABASE = 'products'

function ProductsContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearch = useDebounce<string>(searchValue)
  const [products, setProducts] = useState<ProductItem[]>([])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from(PRODUCTS_DATABASE).select('*')
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
      const { data, error } = await supabase.from(PRODUCTS_DATABASE).insert([
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
      const { error } = await supabase.from(PRODUCTS_DATABASE).delete().match({ id: productId })
      if (error)
        throw error

      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId))
    }
    catch (error) {
      const { message } = getErrorMessage(error)
      console.error('Error deleting product:', message)
    }
  }

  const deleteProducts = async () => {
    try {
      const productsToDelete = products.filter(product => product.isChecked)
      const productIdsToDelete = productsToDelete.map(product => product.id)

      if (productIdsToDelete.length === 0) {
        return
      }

      const { error } = await supabase
        .from(PRODUCTS_DATABASE)
        .delete()
        .in('id', productIdsToDelete)

      if (error)
        throw error

      setProducts(prevProducts => prevProducts.filter(product => !product.isChecked))
    }

    catch (error) {
      const { message } = getErrorMessage(error)
      console.error('Error deleting products:', message)
    }
  }

  async function updateProduct(updateProduct: ProductItem, id: string) {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('User is not logged in')
    }

    if (!id) {
      throw new Error('Product ID is required for update')
    }

    const { error } = await supabase
      .from(PRODUCTS_DATABASE)
      .update(updateProduct)
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      throw new Error('Error updating product')
    }

    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, ...updateProduct } : product,
      ),
    )
  }

  const filteredProducts = useMemo(() => {
    return products.filter(item =>
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    )
  }, [products, debouncedSearch])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: id, checked } = event.target
    if (id === 'allSelect') {
      const tempProduct = products.map(product => ({
        ...product,
        isChecked: checked,
      }))
      setProducts(tempProduct)
    }
    else {
      const tempProduct = products.map(product =>
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
    deleteProducts,
    handleSearchChange,
  }), [loading, products, filteredProducts, debouncedSearch])

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
