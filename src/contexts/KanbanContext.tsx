'use client'

import { getCurrentUser } from '@/app/auth/authUtils'
import { getErrorMessage } from '@/types/'
import { createClient } from '@/utils/supabase/client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { CardFormData } from '@/app/kanban/components/KanbanForm'
import type { ReactNode } from 'react'

export interface KanbanCardItem extends CardFormData {
  id: string
}

interface KanbanCardContextType {
  kanbanCard: KanbanCardItem[]
  addCard: (data: KanbanCardItem) => Promise<void>
  updateCard: (data: KanbanCardItem) => Promise<void>
  loading: boolean
  deleteCard: (id: string) => Promise<void>
}

const supabase = createClient()

const KanbanContext = createContext<KanbanCardContextType | undefined>(undefined)

function KanbanContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [kanbanCard, setKanbanCard] = useState<KanbanCardItem[]>([])

  const fetchKanbanCard = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from('kanban_cards').select('*')
      if (error)
        throw error

      setKanbanCard(data || [])
    }
    catch (error) {
      const { message } = getErrorMessage(error)
      console.error('Error fetching kanbanCards:', message)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchKanbanCard()
  }, [])

  const addCard = async (newCard: KanbanCardItem) => {
    try {
      const { data: { user } } = await getCurrentUser()

      if (!user) {
        throw new Error('User is not authenticated')
      }
      const { data, error } = await supabase.from('kanban_cards').insert([
        {
          title: newCard.title,
          description: newCard.description,
          user_id: user.id,
        },
      ]).select('*')
      if (error)
        throw error

      setKanbanCard(prevCard => [...prevCard, data[0]])
    }
    catch (error) {
      const { message } = getErrorMessage(error)
      console.error('Error adding card:', message)
    }
  }

  const deleteCard = async (cardId: string) => {
    try {
      const { error } = await supabase.from('kanban_cards').delete().match({ id: cardId })
      if (error)
        throw error

      setKanbanCard(prevCard => prevCard.filter(card => card.id !== cardId))
    }
    catch (error) {
      const { message } = getErrorMessage(error)
      console.error('Error deleting card:', message)
    }
  }

  async function updateCard(updateCard: KanbanCardItem) {
    const { data: { user } } = await getCurrentUser()

    if (!user) {
      throw new Error('User is not logged in')
    }

    if (!updateCard.id) {
      throw new Error('Card ID is required for update')
    }

    const { error } = await supabase.from('kanban_cards').update(updateCard).match({
      title: updateCard.title,
      description: updateCard.description,
      user_id: user.id,
    })

    if (error) {
      throw new Error('Error updating task')
    }
  }

  const value = useMemo(() => ({ updateCard, addCard, deleteCard, loading, kanbanCard }), [loading, kanbanCard])

  return (
    <KanbanContext.Provider value={value}>
      {children}
    </KanbanContext.Provider>
  )
}

function useKanbanCard() {
  const context = useContext(KanbanContext)
  if (!context) {
    throw new Error('useKanbanCard must be used within a KanbanContextProvider')
  }
  return context
}

export { KanbanContextProvider, useKanbanCard }
