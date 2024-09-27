'use client'

import { Button } from '@/components/ui'
import { useKanbanCard } from '@/contexts'
import { useModal } from '@/hooks'
import { Plus } from 'lucide-react'
import Board from './components/Board'
import KanbanForm from './components/KanbanForm'

function KanbanPage() {
  const cardModalProps = useModal()
  const { kanbanCard, setKanbanCard } = useKanbanCard()

  return (
    <div className="p-4 flex flex-col gap-4">
      <Board cards={kanbanCard} setCards={setKanbanCard} />
      <Button
        onClick={cardModalProps.onOpen}
        variant="dashed"
        className="max-w-[448px]"
        size="lg"
        iconBefore={<Plus className="w-4 h-4" />}
      >
        Add onether card
      </Button>
      <KanbanForm modalProps={cardModalProps} />
    </div>
  )
}

export default KanbanPage
