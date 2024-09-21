import { cn } from '@/lib/utils'
import { ArrowDown } from 'lucide-react'
import React from 'react'
import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  selectOptions: { id: number, value: string }[]
}

const defaultClassName = 'block w-full px-4 py-2 bg-gray-dark border border-opacity-medium rounded-lg appearance-none focus:outline-none focus:ring focus:ring-blue-300'

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, selectOptions, ...props }, ref) => (
    <div className="relative">
      <select
        className={cn(defaultClassName, className)}
        ref={ref}
        {...props}
      >
        {selectOptions.map(item => (
          <option key={item.id} value={item.value}>
            {item.value}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-3">
        <ArrowDown className="w-4 h-4 text-gray-600" />
      </div>
    </div>
  ),
)

Select.displayName = 'Select'
export default Select
