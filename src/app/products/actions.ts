'use server'

import { createClient } from '@/utils/supabase/server'

const supabase = createClient()

export async function handleDelete(id: string) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error)
      throw error
  }
  catch (error: any) {
    console.error('Error deleting product:', error.message)
  }
}
