'use client'

import { Button } from '@/components/ui'
import { useModal } from '@/hooks'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import Board from './components/Board'
import KanbanForm from './components/KanbanForm'

const DEFAULT_CARDS = [
  // BACKLOG
  {
    title: 'Look into render bug in dashboard',
    id: '1',
    column: 'backlog',
    description: 'Investigate and fix the rendering bug in the dashboard component.',
    deadlines: '2',
  },
  {
    title: 'SOX compliance checklist',
    id: '2',
    column: 'backlog',
    description: 'Complete the checklist for SOX compliance in this quarter.',
    deadlines: '3',
  },
  {
    title: '[SPIKE] Migrate to Azure',
    id: '3',
    column: 'backlog',
    description: 'Evaluate the potential of migrating services to Microsoft Azure.',
    image: 'azure-logo.png',
    deadlines: '7',
  },
  {
    title: 'Document Notifications service',
    id: '4',
    column: 'backlog',
    description: 'Write detailed documentation for the Notifications microservice.',
    deadlines: '12',
  },
  // TODO
  {
    title: 'Research DB options for new microservice',
    id: '5',
    column: 'todo',
    description: 'Explore different database options for the upcoming microservice.',
    deadlines: '5',
  },
  {
    title: 'Postmortem for outage',
    id: '6',
    column: 'todo',
    description: 'Conduct a postmortem on the recent system outage and report findings.',
    deadlines: '9',
    image: 'postmortem-chart.png',
  },
  {
    title: 'Sync with product on Q3 roadmap',
    id: '7',
    column: 'todo',
    description: 'Coordinate with the product team to align on the Q3 feature roadmap.',
    deadlines: '23',
  },

  // DOING
  {
    title: 'Refactor context providers to use Zustand',
    id: '8',
    column: 'doing',
    description: 'Refactor existing context providers in the app to use Zustand for state management.',
    deadlines: '13',
  },
  {
    title: 'Add logging to daily CRON',
    id: '9',
    column: 'doing',
    description: 'Implement comprehensive logging for the daily CRON jobs to track executions.',
    deadlines: '14',
  },

  // DONE
  {
    title: 'Set up DD dashboards for Lambda listener',
    id: '10',
    column: 'done',
    description: 'Set up Datadog dashboards for monitoring the Lambda event listeners.',
    deadlines: '2',
    image: 'datadog-dashboard.png',
  },
]

export type ColumnType = 'backlog' | 'todo' | 'doing' | 'done'

export interface CardType {
  title: string
  id: string
  description: string
  deadlines: string
  column: ColumnType
  image: string
}

function KanbanPage() {
  const [cards, setCards] = useState(DEFAULT_CARDS)

  const handlesetCards = (data: any) => {
    const newObj = {
      id: crypto.randomUUID(),
      title: data.title,
      deadlines: data.deadlines,
      description: data.description,
      image: data.image,
      column: 'backlog',
    }
    setCards(prev => [...prev, newObj])
  }

  const cardModalProps = useModal()
  return (
    <div className="p-4 flex flex-col gap-4">
      <Board cards={cards} setCards={setCards} />
      <Button
        onClick={cardModalProps.onOpen}
        variant="dashed"
        className="max-w-[448px]"
        size="lg"
        iconBefore={<Plus className="w-4 h-4" />}
      >
        Add onether card
      </Button>
      <KanbanForm cardModalProps={cardModalProps} setCards={handlesetCards} />
    </div>
  )
}

export default KanbanPage
