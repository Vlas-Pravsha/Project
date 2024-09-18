'use client'

import { useState } from 'react'
import type { MouseEvent } from 'react'

interface UsePasswordVisibilityReturn {
  passwordShown: boolean
  togglePasswordVisibility: (event: MouseEvent) => void
  inputType: string
}

function usePasswordVisibility(): UsePasswordVisibilityReturn {
  const [passwordShown, setPasswordShown] = useState(false)

  const togglePasswordVisibility = (event: MouseEvent) => {
    event.preventDefault()
    setPasswordShown(!passwordShown)
  }

  return {
    passwordShown,
    togglePasswordVisibility,
    inputType: passwordShown ? 'text' : 'password',
  }
}

export { usePasswordVisibility }
