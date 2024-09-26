import { Card } from '@/components/ui/'
import { SquarePen } from 'lucide-react'
import React from 'react'
import type { CardType } from '../page'

type CardProps = CardType & {
  handleDragStart: (e: React.DragEvent, card: Omit<CardType, 'image'>) => void
}

function KanbanCard({ title, id, column, description, deadlines, image, handleDragStart }: CardProps) {
  return (
    <>
      <div
        className="cursor-grab active:cursor-grabbing pb-4"
        draggable="true"
        onDragStart={e => handleDragStart(e, { title, id, column, description, deadlines })}
      >
        {image
          ? (
              <Card>
                <Card.Header>
                  <Card.Title>{title}</Card.Title>
                  <SquarePen className="w-5 h-5" />
                </Card.Header>
                <Card.Image src="task-1.jpg" alt="Task Image" />
                <Card.Description className="self-start">
                  {description}
                </Card.Description>
                <div className="w-full flex justify-end">
                  <Card.Deadlines>
                    {deadlines}
                    {' '}
                    days left
                  </Card.Deadlines>
                </div>
              </Card>
            )
          : (
              <Card>
                <Card.Header>
                  <Card.Title>{title}</Card.Title>
                  <SquarePen className="w-5 h-5" />
                </Card.Header>
                <Card.Description className="self-start">
                  {description}
                </Card.Description>
                <div className="w-full flex justify-end">
                  <Card.Deadlines>
                    {deadlines}
                    {' '}
                    days left
                  </Card.Deadlines>
                </div>
              </Card>
            )}

      </div>
    </>
  )
}

export default KanbanCard
