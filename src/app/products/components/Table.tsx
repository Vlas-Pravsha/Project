import ProductRow from './ProductRow'
import TableHeader from './TableHeader'
import type { ProductItem } from '../page'

interface TableProps {
  productsData: ProductItem[]
  toogleHandleClick: () => void
  tableTitle: string[]
}

function Table({ productsData, toogleHandleClick, tableTitle }: TableProps) {
  return (
    <table className="w-full border-b border-t border-gray100Opacity">
      <TableHeader tableTitle={tableTitle} />
      <tbody>
        {productsData.map((product, index) => (
          <ProductRow key={product.id} product={product} index={index} toogleHandleClick={toogleHandleClick} />
        ))}
      </tbody>
    </table>
  )
}

export default Table
