import { createClient } from '@/utils/supabase/client'

type Providers = 'google' | 'github'

const supabase = createClient()

export async function signInWithGoogle() {
  return signInWithProvider('google')
}

export async function signInWithGithub() {
  return signInWithProvider('github')
}

async function signInWithProvider(provider: Providers) {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error(`Error logging in via ${provider}:`, error.message)
      throw error
    }
  }
  catch (error) {
    console.error(`Unexpected error when logging in via ${provider}:`, error)
    throw error
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Exit error:', error.message)
      throw error
    }
  }
  catch (error) {
    console.error('Exit error:', error)
    throw error
  }
}

export function getCurrentUser() {
  return supabase.auth.getUser()
}

export function onAuthStateChange(callback: any) {
  return supabase.auth.onAuthStateChange(callback)
}
