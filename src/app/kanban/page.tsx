'use client'

import { Button } from '@/components/ui'
import { useModal } from '@/hooks'
import { Plus } from 'lucide-react'
import KanbanCard from './components/KanbanCard'
import KanbanForm from './components/KanbanForm'

function KanbanPage() {
  const cardModalProps = useModal()
  return (
    <div className="p-4 flex flex-col gap-4">
      <KanbanCard />
      <Button
        onClick={cardModalProps.onOpen}
        variant="dashed"
        className="max-w-[448px]"
        size="lg"
        iconBefore={<Plus className="w-4 h-4" />}
      >
        Add onether card
      </Button>
      <KanbanForm cardModalProps={cardModalProps} />
    </div>
  )
}

export default KanbanPage
