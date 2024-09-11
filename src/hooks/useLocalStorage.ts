// import { useEffect, useState } from 'react'

// export function useLocalStorage<T>(key: string, initialValue: T) {
//   const getValue = () => {
//     const storedValue = localStorage.getItem(key)
//     return storedValue !== null ? JSON.parse(storedValue) : initialValue
//   }

//   const [value, setValue] = useState(getValue)

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value))
//   }, [key, value])

//   return [value, setValue]
// }

import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const storedValue = localStorage.getItem(key)
      return storedValue !== null ? JSON.parse(storedValue) : initialValue
    }
    catch (error) {
      console.error(error)
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}