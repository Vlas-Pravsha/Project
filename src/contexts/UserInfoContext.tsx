'use client'

import { getCurrentUser } from '@/app/auth/authUtils'
import { getErrorMessage } from '@/types'
import { createClient } from '@/utils/supabase/client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { GeneralFormData } from '@/app/settings/components/GeneralInfo'
import type { SkillsAndHobbiesData } from '@/app/settings/components/SkillsAndHobbies'
import type { UserImageData } from '@/app/settings/components/UserImageUpload'
import type { ReactNode } from 'react'

type UserInfoItem = {
  id: string
} & GeneralFormData & SkillsAndHobbiesData & UserImageData

interface UserContextType {
  userInfo: UserInfoItem[]
  loading: boolean
  saveUserInfo: (userInfo: UserInfoItem) => Promise<void>
  updateUserInfo: (userInfo: UserInfoItem, id: string) => Promise<void>
}

const USER_INFO_DATABASE = 'user_profile'

const UserContext = createContext<UserContextType | undefined>(undefined)

function UserInfoProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfoItem[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  const fetchUserInfo = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from(USER_INFO_DATABASE).select('*')
      if (error)
        throw error

      setUserInfo(data || [])
    }
    catch (error) {
      const { message } = getErrorMessage(error)
      console.error('Error fetching user info:', message)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const saveUserInfo = async (userInfo: UserInfoItem) => {
    try {
      const { data: { user } } = await getCurrentUser()

      if (!user) {
        throw new Error('User is not authenticated')
      }

      const { data, error } = await supabase.from(USER_INFO_DATABASE).insert([
        {
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          country: userInfo.country,
          city: userInfo.city,
          address: userInfo.address,
          education: userInfo.education,
          phone_number: userInfo.number,
          birthday: userInfo.birthday,
          organization: userInfo.organization || null,
          role: userInfo.role || null,
          department: userInfo.department || null,
          code: userInfo.code || null,
          about_me: userInfo.aboutMe || null,
          user_id: user.id,
        },
      ]).select('*')

      if (error)
        throw error

      setUserInfo(prevUserInfo => [...prevUserInfo, data[0]])
    }
    catch (error) {
      const { message } = getErrorMessage(error)
      console.error('Error adding user info:', message)
    }
  }

  async function updateUserInfo(updatedUserInfo: UserInfoItem, id: string) {
    const { data: { user } } = await getCurrentUser()

    if (!user) {
      throw new Error('User is not logged in')
    }

    if (!id) {
      throw new Error('User info ID is required for update')
    }

    const { error } = await supabase
      .from(USER_INFO_DATABASE)
      .update(updatedUserInfo)
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      throw new Error('Error updating user info')
    }

    setUserInfo(prevUserInfo =>
      prevUserInfo.map(info =>
        info.id === id ? { ...info, ...updatedUserInfo } : info,
      ),
    )
  }

  const value = useMemo(() => ({ saveUserInfo, updateUserInfo, userInfo, loading }), [loading, userInfo])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function useUserInfoContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserInfoContext must be used within a UserProvider')
  }
  return context
}

export { UserInfoProvider, useUserInfoContext }
