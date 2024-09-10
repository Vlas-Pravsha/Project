'use client'

import MainLayout from '@/components/layout/MainLayout'
import { Button, Input } from '@/components/ui'
import Modal from '@/components/ui/Modal'
import useModal from '@/hooks/useModal'
import Image from 'next/image'
import React from 'react'
import { v1 } from 'uuid'
import Pagination from './components/Pagination'
import Table from './components/Table'

const productsData = [
  {
    name: 'Education Dashboard',
    category: 'Html templates',
    technology: 'Angular',
    id: v1(),
    description:
      'Start developing with an open-source library of over 450+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.',
    price: '$149',
    discount: 'No',
  },
  {
    name: 'React UI Kit',
    category: 'Html templates',
    technology: 'React JS',
    id: v1(),
    description:
      'Start developing with an open-source library of over 450+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.',
    price: '$129',
    discount: '10%',
  },
  {
    name: 'Education Dashboard',
    category: 'Html templates',
    technology: 'Angular',
    id: v1(),
    description:
      'Start developing with an open-source library of over 450+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.',
    price: '$149',
    discount: 'No',
  },
  {
    name: 'React UI Kit',
    category: 'Html templates',
    technology: 'React JS',
    id: v1(),
    description:
      'Start developing with an open-source library of over 450+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.',
    price: '$129',
    discount: 'No',
  },
  {
    name: 'Education Dashboard',
    category: 'Html templates',
    technology: 'Angular',
    id: v1(),
    description:
      'Start developing with an open-source library of over 450+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.',
    price: '$149',
    discount: '25%',
  },
  {
    name: 'Education Dashboard',
    category: 'Html templates',
    technology: 'Angular',
    id: v1(),
    description:
      'Start developing with an open-source library of over 450+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.',
    price: '$149',
    discount: '10%',
  },
  {
    name: 'React UI Kit',
    category: 'Html templates',
    technology: 'React JS',
    id: v1(),
    description:
      'Start developing with an open-source library of over 450+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.',
    price: '$129',
    discount: 'No',
  },
  {
    name: 'Education Dashboard',
    category: 'Html templates',
    technology: 'Angular',
    id: v1(),
    description:
      'Start developing with an open-source library of over 450+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.',
    price: '$149',
    discount: 'No',
  },
  {
    name: 'Education Dashboard',
    category: 'Html templates',
    technology: 'Angular',
    id: v1(),
    description:
      'Start developing with an open-source library of over 450+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.',
    price: '$149',
    discount: '25%',
  },
  {
    name: 'Education Dashboard',
    category: 'Html templates',
    technology: 'Angular',
    id: v1(),
    description:
      'Start developing with an open-source library of over 450+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.',
    price: '$149',
    discount: '10%',
  },
  {
    name: 'React UI Kit',
    category: 'Html templates',
    technology: 'React JS',
    id: v1(),
    description:
      'Start developing with an open-source library of over 450+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.',
    price: '$129',
    discount: 'No',
  },
  {
    name: 'Education Dashboard',
    category: 'Html templates',
    technology: 'Angular',
    id: v1(),
    description:
      'Start developing with an open-source library of over 450+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.',
    price: '$149',
    discount: 'No',
  },
  {
    name: 'React UI Kit',
    category: 'Html templates',
    technology: 'React JS',
    id: v1(),
    description:
      'Start developing with an open-source library of over 450+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.',
    price: '$129',
    discount: 'No',
  },
  {
    name: 'Education Dashboard',
    category: 'Html templates',
    technology: 'Angular',
    id: v1(),
    description:
      'Start developing with an open-source library of over 450+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.',
    price: '$149',
    discount: 'No',
  },
]

const tableTitle = [
  'PRODUCT NAME',
  'TECHNOLOGY',
  'DESCRIPTION',
  'ID',
  'PRICE',
  'DISCOUNT',
  'ACTIONS',
]

export interface ProductItem {
  id: string
  name: string
  category: string
  technology: string
  description: string
  price: string
  discount: string
}
function Products() {
  const modalProps = useModal()

  return (
    <MainLayout>
      <div className="flex bg-gray800">
        <div className="w-full">
          <h2 className="text-2xl font-semibold my-4 mx-6">All products</h2>
          <Input placeholder="Search for product" className="max-w-sm mb-4 ml-5" />
          <Table
            tableTitle={tableTitle}
            productsData={productsData}
            toogleHandleClick={modalProps.onOpen}
          />
          <Pagination />
        </div>
        <Modal {...modalProps}>
          <Modal.Body>
            <div className="flex justify-end p-2">
              <Image
                src="/exit.svg"
                alt="Exit"
                className="h-5 w-5 hover:cursor-pointer"
                onClick={modalProps.onClose}
                width="20"
                height="20"
              />
            </div>
            <div className="flex flex-col items-center gap-6">
              <Image
                src="/delete.svg"
                alt="Delete"
                className="h-14 w-14"
                width="60"
                height="60"
              />
              <Modal.Text>
                Are you sure you want to delete this user?
              </Modal.Text>
              <Modal.Footer>
                <Button variant="delete">Yes, I'm sure</Button>
                <Button variant="secondary" onClick={modalProps.onClose}>No, cancel</Button>
              </Modal.Footer>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </MainLayout>
  )
}

export default Products
