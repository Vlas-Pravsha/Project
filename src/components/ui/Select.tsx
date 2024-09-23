'use client'

import { cn } from '@/lib/utils'
import { ArrowDown } from 'lucide-react'
import React, { useState } from 'react'
import type { ForwardedRef } from 'react'

export interface OptionItem {
  label: string
  value: string | number
}

interface SingleSelectProps {
  multiple?: false
  value?: OptionItem
  onChange: (value: OptionItem | null) => void
}

interface MultipleSelectProps {
  multiple: true
  value: OptionItem[]
  onChange: (value: OptionItem[]) => void
}

type SelectProps = {
  className?: string
  options: OptionItem[]
} & (SingleSelectProps | MultipleSelectProps)

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ className, multiple, onChange, options, value, ...props }, ref: ForwardedRef<HTMLDivElement>) => {
    const [isOpen, setIsOpen] = useState(false)

    const clearOptions = () => {
      return multiple ? onChange([]) : onChange(null)
    }

    const selectOption = (option: OptionItem) => {
      if (multiple) {
        if (value.some(v => v.value === option.value)) {
          onChange(value.filter(v => v.value !== option.value))
        }
        else {
          onChange([...value, option])
        }
      }
      else {
        if (option.value !== value?.value) {
          onChange(option)
        }
        else {
          onChange(null)
        }
      }
    }

    return (
      <div
        tabIndex={0}
        ref={ref}
        {...props}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen(prev => !prev)}
        className={cn('relative w-full min-h-6 border border-opacity-medium flex items-center gap-2 p-2 rounded-lg outline-none focus:ring focus:ring-blue-300', className)}
      >
        <span className="grow flex flex-row gap-2 flex-wrap">
          {multiple
            ? value.map(v => (
              <button
                className="px-2 py-px flex gap-2 border border-opacity-medium rounded-lg hover:bg-danger"
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation()
                  selectOption(v)
                }}
              >
                {v.value}
                <span>&times;</span>
              </button>
            ))
            : value?.value}
        </span>
        <button
          onClick={(event) => {
            event.stopPropagation()
            event.preventDefault()
            clearOptions()
          }}
          className="bg-none p-0 text-2xl"
        >
          &times;
        </button>
        <div className="self-stretch w-0.5 bg-opacity-medium"></div>
        <ArrowDown className="w-4 h-4 cursor-pointer" />
        <ul className={`${isOpen ? 'block' : 'hidden'} m-0 p-0 scrollbar-elegant absolute w-full left-0 z-50 top-[calc(100%+0.5rem)] bg-gray-dark list-none border rounded-lg border-opacity-medium block max-h-60 overflow-y-auto`}>
          {options.map(option => (
            <li
              key={`${option.label}-${option.value}`}
              className="px-2 py-2 cursor-pointer hover:bg-blue-300"
              onClick={(event) => {
                event.stopPropagation()
                selectOption(option)
                setIsOpen(false)
              }}
            >
              {option.value}
            </li>
          ))}
        </ul>
      </div>
    )
  },

)

Select.displayName = 'Select'
export { Select }
