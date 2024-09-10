import { Button } from '@/components/ui'
import CheckBox from '@/components/ui/CheckBox'
import { Edit, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import type { ProductItem } from '../page'

interface TableProps {
  productsData: ProductItem[]
  toogleHandleClick: () => void
  tableTitle: string[]
}

function Table({ productsData, toogleHandleClick, tableTitle }: TableProps) {
  const thStyle = 'text-left p-4 text-xs font-medium bg-gray800 text-gray500'

  return (
    <table className="w-full border-b border-t border-gray100Opacity">
      <thead>
        <tr className="bg-gray700">
          <th className={thStyle}>
            <CheckBox />
          </th>
          {tableTitle.map(item => (
            <th className={thStyle} key={item}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {productsData.map((product: ProductItem, index: number) => {
          const { name, category, technology, id, description, price, discount } = product
          const slicedDescription = description.slice(0, 71)

          return (
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
                <span className="text-sm text-gray500">{`${slicedDescription}...`}</span>
              </td>
              <td className="p-4">
                <span className="text-sm">
                  {index}
                </span>
              </td>
              <td className="p-4">
                <span className="text-sm">{price}</span>
              </td>
              <td className="p-4">{discount}</td>
              <td className="p-4">
                <div className="flex gap-4">
                  <Button variant="primary" size="sm" iconBefore={<Edit className="w-4 h-4" color="white" />}>
                    Update
                  </Button>
                  <Button size="sm" variant="delete" iconBefore={<Trash className="w-4 h-4" color="white" />} onClick={toogleHandleClick}>
                    Delete item
                  </Button>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
