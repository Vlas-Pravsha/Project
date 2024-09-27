'use client'

import { useLocalStorage } from '@/hooks'
import { createContext, useContext, useMemo } from 'react'
import type { CardFormData } from '@/app/kanban/components/KanbanForm'
import type { ReactNode } from 'react'

const DEFAULT_CARDS: CardType[] = [
  // BACKLOG
  {
    title: 'Look into render bug in dashboard',
    id: '1',
    column: 'backlog',
    description: 'Investigate and fix the rendering bug in the dashboard component.',
    deadlines: 2,
    image: '',
  },
  {
    title: 'SOX compliance checklist',
    id: '2',
    column: 'backlog',
    description: 'Complete the checklist for SOX compliance in this quarter.',
    deadlines: 3,
    image: '',
  },
  {
    title: '[SPIKE] Migrate to Azure',
    id: '3',
    column: 'backlog',
    description: 'Evaluate the potential of migrating services to Microsoft Azure.',
    deadlines: 7,
    image: '/task-1.jpg',
  },
  {
    title: 'Document Notifications service',
    id: '4',
    column: 'backlog',
    description: 'Write detailed documentation for the Notifications microservice.',
    deadlines: 12,
    image: '',
  },
  // TODO
  {
    title: 'Research DB options for new microservice',
    id: '5',
    column: 'todo',
    description: 'Explore different database options for the upcoming microservice.',
    deadlines: 5,
    image: '',
  },
  {
    title: 'Postmortem for outage',
    id: '6',
    column: 'todo',
    description: 'Conduct a postmortem on the recent system outage and report findings.',
    deadlines: 9,
    image: '/task-1.jpg',
  },
  {
    title: 'Sync with product on Q3 roadmap',
    id: '7',
    column: 'todo',
    description: 'Coordinate with the product team to align on the Q3 feature roadmap.',
    deadlines: 23,
    image: '',
  },

  // DOING
  {
    title: 'Refactor context providers to use Zustand',
    id: '8',
    column: 'doing',
    description: 'Refactor existing context providers in the app to use Zustand for state management.',
    deadlines: 13,
    image: '',
  },
  {
    title: 'Add logging to daily CRON',
    id: '9',
    column: 'doing',
    description: 'Implement comprehensive logging for the daily CRON jobs to track executions.',
    deadlines: 14,
    image: '',
  },

  // DONE
  {
    title: 'Set up DD dashboards for Lambda listener',
    id: '10',
    column: 'done',
    description: 'Set up Datadog dashboards for monitoring the Lambda event listeners.',
    deadlines: 2,
    image: '/task-1.jpg',
  },
]

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
