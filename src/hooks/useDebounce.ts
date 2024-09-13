'use client'

import { useEffect, useState } from 'react'

function useDebounce<T>(value: T, delay = 350) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}

export { useDebounce }
