'use client'

import { useLocalStorage } from '@/hooks'
import { createContext, useContext, useEffect, useMemo } from 'react'
import type { CardFormData } from '@/app/kanban/components/KanbanForm'
import type { ReactNode } from 'react'

const DEFAULT_CARDS: CardType[] = []

export type ColumnType = 'backlog' | 'todo' | 'doing' | 'done'

export type CardType = {
  id: string
  column: ColumnType
} & CardFormData

interface KanbanCardContextType {
  kanbanCard: CardType[]
  addCard: (data: CardFormData) => void
  updateCard: (data: CardFormData, id: string) => void
  setKanbanCard: React.Dispatch<React.SetStateAction<CardType[]>>
}

const KanbanContext = createContext<KanbanCardContextType | undefined>(undefined)

function KanbanContextProvider({ children }: { children: ReactNode }) {
  const [kanbanCard, setKanbanCard] = useLocalStorage<CardType[]>('kanban', DEFAULT_CARDS)

  useEffect(() => {
    const interval = setInterval(() => {
      setKanbanCard(prevCards =>
        prevCards.map(card =>
          card.deadlines > 0 ? { ...card, deadlines: card.deadlines - 1 } : card,
        ),
      )
    }, 1000 * 60 * 60 * 24)

    return () => clearInterval(interval)
  }, [setKanbanCard])

  const addCard = (data: CardFormData) => {
    const file = data.image[0]
    let urlImage: string | undefined
    if (file) {
      urlImage = URL.createObjectURL(file)
    }

    const newObj: CardType = {
      title: data.title,
      deadlines: data.deadlines,
      description: data.description,
      id: crypto.randomUUID(),
      image: urlImage || '',
      column: 'backlog',
    }

    setKanbanCard(prev => [...prev, newObj])
  }

  const updateCard = (data: CardFormData, id: string) => {
    setKanbanCard(prevCard =>
      prevCard.map(card =>
        card.id === id ? { ...card, ...data } : card,
      ),
    )
  }

  const value = useMemo(() => ({ kanbanCard, addCard, updateCard, setKanbanCard }), [kanbanCard])

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
