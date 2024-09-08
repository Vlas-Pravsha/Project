import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const getValue = () => {
    const storedValue = localStorage.getItem(key)
    return storedValue !== null ? JSON.parse(storedValue) : initialValue
  }

  const [value, setValue] = useState(getValue)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
