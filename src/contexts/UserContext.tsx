'use client'

import { createClient } from '@/utils/supabase/client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import type { ReactNode } from 'react'

interface UserContextType {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  async function getUser() {
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      console.error('No active session or user not found')
      setLoading(false)
      return
    }
    setUser(data.user)
    setLoading(false)
  }

  useEffect(() => {
    getUser()
  }, [supabase.auth])

  const value = useMemo(() => ({ user, loading, setUser }), [loading, user])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}

export { UserProvider, useUserContext }
