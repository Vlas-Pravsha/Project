import { Button } from '@/components/ui'
import CheckBox from '@/components/ui/CheckBox'
import { useModal } from '@/hooks'
import { Edit, Trash } from 'lucide-react'
import React from 'react'
import type { ProductItem } from '@/contexts/ProductsContext'
import DeleteModal from './DeleteModal'

interface ProductRowProps {
  product: ProductItem
  index: number
}

function ProductRow({ product, index }: ProductRowProps) {
  const deleteModalProps = useModal()

  const { name, category, technology, id, description, price, discount } = product
  const slicedDescription = description.slice(0, 71)

  return (
    <>
      <tr key={id} className="border-t border-gray100Opacity">
        <td className="p-4">
          <CheckBox />
        </td>
        <td className="p-4">
          <div className="flex gap-2">
            <div className="flex flex-col">
              <div className="text-lg font-semibold">{name}</div>
              <span className="text-sm text-gray500">{category}</span>
            </div>
          </div>
        </td>
        <td className="p-4">{technology}</td>
        <td className="p-4">
          <span className="text-sm text-gray500">{`${description.length > 70 ? `${slicedDescription}...` : description}`}</span>
        </td>
        <td className="p-4">
          <span className="text-sm">{index}</span>
        </td>
        <td className="p-4">
          <span className="text-sm">{`$${price}`}</span>
        </td>
        <td className="p-4">{discount}</td>
        <td className="p-4">
          <div className="flex gap-4">
            <Button variant="primary" size="sm" iconBefore={<Edit className="w-4 h-4" color="white" />}>
              Update
            </Button>
            <Button size="sm" variant="delete" iconBefore={<Trash className="w-4 h-4" color="white" />} onClick={deleteModalProps.onOpen}>
              Delete item
            </Button>
          </div>
        </td>
      </tr>
      <DeleteModal deleteModalProps={deleteModalProps} id={id} />
    </>
  )
}

export default ProductRow
