import { Card } from '@/components/ui/'
import { useModal } from '@/hooks'
import { Check, Clock4, SquarePen } from 'lucide-react'
import React from 'react'
import type { CardType } from '@/contexts'
import KanbanForm from './KanbanForm'

type CardProps = CardType & {
  handleDragStart: (e: React.DragEvent, card: CardType) => void
  card: CardType
}

function KanbanCard({ title, id, column, description, deadlines, image, card, handleDragStart }: CardProps) {
  const cardModalEditProps = useModal()
  return (
    <div
      className="cursor-grab active:cursor-grabbing pb-4"
      draggable="true"
      onDragStart={e => handleDragStart(e, { title, id, column, description, deadlines })}
    >
      <Card>
        <Card.Header>
          <Card.Title>{title}</Card.Title>
          <button onClick={cardModalEditProps.onOpen}>
            <SquarePen className="w-5 h-5" />
          </button>
        </Card.Header>

        {image && <Card.Image src={image} alt="Task Image" />}

        <Card.Description className="self-start">
          {description}
        </Card.Description>

        <div className="w-full flex justify-end">
          {column === 'done'
            ? (
                <Card.Deadlines icon={Check} className="bg-green-300">
                  Done
                </Card.Deadlines>
              )
            : (
                <Card.Deadlines icon={Clock4}>
                  {deadlines}
                  {' '}
                  days left
                </Card.Deadlines>
              )}
        </div>
      </Card>
      <KanbanForm modalProps={cardModalEditProps} card={card} id={id} />
    </div>
  )
}

export default KanbanCard
