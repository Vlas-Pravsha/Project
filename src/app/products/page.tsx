'use client'

import MainLayout from '@/components/layout/MainLayout'
import { Button, Input } from '@/components/ui'
import { useProducts } from '@/contexts/'
import { useDebounce, useModal } from '@/hooks/'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import FormModal from './components/FormModal'
import Pagination from './components/Pagination'
import Table from './components/Table'

const tableHeaderArray = ['PRODUCT NAME', 'TECHNOLOGY', 'DESCRIPTION', 'ID', 'PRICE', 'DISCOUNT', 'ACTIONS']

function Products() {
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearch = useDebounce<string>(searchValue)
  const { products, loading } = useProducts()
  const formModalProps = useModal()

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
          />
          <Pagination products={products} />
        </div>
        <FormModal formModalProps={formModalProps} />
      </div>
    </MainLayout>
  )
}

export default Products
