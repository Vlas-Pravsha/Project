'use server'

import { createClient } from '@/utils/supabase/server'
import type { ProductFormData } from './components/FormModal'

const supabase = createClient()

export async function deleteProduct(id: string) {
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

export async function addProduct(formData: ProductFormData) {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('User is not authenticated')
    }

    const { error } = await supabase
      .from('products')
      .insert([
        {
          name: formData.productName,
          category: formData.category,
          technology: formData.brand,
          description: formData.description,
          price: formData.price,
          discount: 'No',
          user_id: user.id,
        },
      ])
      .select('*')

    if (error)
      throw error
  }

  catch (error: any) {
    console.error('Error deleting product:', error.message)
  }
}
