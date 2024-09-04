'use client'

import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { User } from 'firebase/auth'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '@/../firebase'

const AuthContext = createContext<{
  user: User | null
  googleSignIn: () => void
  logOut: () => void
} | null>(null)

function googleSignIn() {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const logOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  const value = useMemo(() => ({ user, googleSignIn, logOut }), [user])

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export function UserAuth() {
  return useContext(AuthContext)
}
