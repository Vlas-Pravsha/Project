'use client'

import { useEffect, useState } from 'react'

function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    if (typeof window !== 'undefined') {
      try {
        const storedValue = localStorage.getItem(key)
        setValue(storedValue !== null ? JSON.parse(storedValue) : initialValue)
      }
      catch (error) {
        console.error('Error reading localStorage:', error)
      }
    }
  }, [key, initialValue])

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      }
      catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    }
  }, [key, value, isClient])

  return [value, setValue]
}

export { useLocalStorage }
