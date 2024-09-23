import { CheckBox } from '@/components/ui/'
import { useProducts } from '@/contexts'
import type { ProductItem } from '@/contexts'

interface TableHeaderProps {
  tableHeaderArray: string[]
  products: ProductItem[]
}

function TableHeader({ tableHeaderArray, products }: TableHeaderProps) {
  const { handleCheckboxChange } = useProducts()

  const thStyle = 'text-left p-4 text-xs font-medium  text-gray-medium'

  return (
    <thead>
      <tr className="bg-gray-dark">
        <th className={thStyle}>
          <CheckBox
            name="allSelect"
            checked={!products.some(product => product?.isChecked !== true)}
            onChange={handleCheckboxChange}
          />
        </th>
        {tableHeaderArray.map(item => (
          <th className={thStyle} key={item}>
            {item}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
