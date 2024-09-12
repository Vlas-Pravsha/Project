import { createClient } from '@/utils/supabase/client'
import { Loader2, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import ProductRow from './ProductRow'
import TableHeader from './TableHeader'

interface TableProps {
  toogleHandleClick: () => void
  tableHeaderArray: string[]
}

export interface ProductItem {
  id: string
  name: string
  category: string
  technology: string
  description: string
  price: string
  discount: string
}

function Table({ toogleHandleClick, tableHeaderArray }: TableProps) {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

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
          <ProductRow key={product.id} product={product} index={index} toogleHandleClick={toogleHandleClick} />
        ))}
      </tbody>
    </table>
  )
}

export default Table
