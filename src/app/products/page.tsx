'use client'

import MainLayout from '@/components/layout/MainLayout'
import { Button, Input } from '@/components/ui'
import useModal from '@/hooks/useModal'
import { Plus } from 'lucide-react'
import React from 'react'
import DeleteModal from './components/DeleteModal'
import FormModal from './components/FormModal'
import Pagination from './components/Pagination'
import Table from './components/Table'

const tableHeaderArray = [
  'PRODUCT NAME',
  'TECHNOLOGY',
  'DESCRIPTION',
  'ID',
  'PRICE',
  'DISCOUNT',
  'ACTIONS',
]

function Products() {
  const deleteModalProps = useModal()
  const formModalProps = useModal()

  return (
    <MainLayout>
      <div className="flex bg-gray800">
        <div className="w-full">
          <h2 className="text-2xl font-semibold my-4 mx-6">All products</h2>
          <div className="flex justify-between mb-4 mx-5">
            <Input placeholder="Search for product" className="max-w-sm" />
            <Button variant="primary" size="md" iconBefore={<Plus color="white" />} onClick={formModalProps.onOpen}>Add product</Button>
          </div>
          <Table
            tableHeaderArray={tableHeaderArray}
            toogleHandleClick={deleteModalProps.onOpen}
          />
          <Pagination />
        </div>
        <DeleteModal deleteModalProps={deleteModalProps} />
        <FormModal formModalProps={formModalProps} />
      </div>
    </MainLayout>
  )
}

export default Products
