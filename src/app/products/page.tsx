'use client'

import MainLayout from '@/components/layout/MainLayout'
import { Button, Input } from '@/components/ui'
import { useDebounce, useModal } from '@/hooks/'
import { createClient } from '@/utils/supabase/client'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DeleteModal from './components/DeleteModal'
import FormModal from './components/FormModal'
import Pagination from './components/Pagination'
import Table from './components/Table'
import type { ProductItem } from './components/Table'

const tableHeaderArray = ['PRODUCT NAME', 'TECHNOLOGY', 'DESCRIPTION', 'ID', 'PRICE', 'DISCOUNT', 'ACTIONS']

function Products() {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const supabase = createClient()
  const formModalProps = useModal()
  const debouncedSearch = useDebounce<string>(searchValue)

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
          name: newProduct.productName,
          category: newProduct.category,
          technology: newProduct.brand,
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

  const updateProduct = async (updatedProduct: ProductItem) => {
    try {
      const { error } = await supabase
        .from('products')
        .update(updatedProduct)
        .match({ id: updatedProduct.id })
      if (error)
        throw error

      setProducts(prevProducts => prevProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ))
    }
    catch (error: any) {
      console.error('Error updating product:', error.message)
    }
  }

  const filteredTable = products.filter(item =>
    item.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  )

  return (
    <MainLayout>
      <div className="flex bg-gray800">
        <div className="w-full">
          <h2 className="text-2xl font-semibold my-4 mx-6">All products</h2>
          <div className="flex justify-between mb-4 mx-5">
            <Input placeholder="Search for product" className="max-w-sm" value={searchValue} onChange={event => setSearchValue(event.target.value)} />
            <Button variant="primary" size="md" iconBefore={<Plus color="white" />} onClick={formModalProps.onOpen}>Add product</Button>
          </div>
          <Table
            products={filteredTable}
            loading={loading}
            tableHeaderArray={tableHeaderArray}
            onDelete={deleteProduct}
            onUpdate={updateProduct}
          />
          <Pagination products={products} />
        </div>
        <FormModal formModalProps={formModalProps} onAddProduct={addProduct} />
      </div>
    </MainLayout>
  )
}

export default Products
