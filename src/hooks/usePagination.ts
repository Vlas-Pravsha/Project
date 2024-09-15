'use client'

import { useState } from 'react'

interface PaginationProps<T> {
  currentPage: number
  currentProducts: T[]
  totalPages: number
  handlePreviousPage: () => void
  handleNextPage: () => void
}

export function usePagination<T>(items: T[], itemsPerPage: number): PaginationProps<T> {
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProducts = items.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(items.length / itemsPerPage)

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  return {
    currentProducts,
    currentPage,
    totalPages,
    handlePreviousPage,
    handleNextPage,
  }
}

export default usePagination
