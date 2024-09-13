import { Loader2 } from 'lucide-react'
import type { ProductItem } from '@/contexts/ProductsContext'
import ProductRow from './ProductRow'
import TableHeader from './TableHeader'

interface TableProps {
  tableHeaderArray: string[]
  loading: boolean
  products: ProductItem[]
}

function Table({ tableHeaderArray, products, loading }: TableProps) {
  if (loading) {
    return (
      <div className="flex gap-4 items-center p-4">
        <Loader2 className="w-8 h-8 animate-spin" />
        <div>Please wait a minute</div>
      </div>
    )
  }

  return (
    <table className="w-full border-b border-t border-gray100Opacity">
      <TableHeader tableHeaderArray={tableHeaderArray} />
      <tbody>
        {products.map((product, index) => (
          <ProductRow key={product.id} product={product} index={index} />
        ))}
      </tbody>
    </table>
  )
}

export default Table
