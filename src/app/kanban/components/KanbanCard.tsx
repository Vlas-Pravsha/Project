import { Card } from '@/components/ui/'
import { useModal } from '@/hooks'
import { Check, Clock4, SquarePen } from 'lucide-react'
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
      className="rounded-lg cursor-grab active:cursor-grabbing mb-4"
      onDragStart={e => handleDragStart(e, card)}
      draggable
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

        <Card.Footer>
          {column === 'done'
            ? (
                <Card.Deadlines icon={Check} className="bg-green-300 text-[#5b36a0]">
                  Done
                </Card.Deadlines>
              )
            : (
                <Card.Deadlines icon={Clock4} className={`${deadlines > 0 ? 'bg-purple-300 ' : 'bg-secondary'}`}>
                  {deadlines > 0 ? <p className="text-[#5b36a0]">{`${deadlines} days left`}</p> : <p className="text-gray-medium">time&apos;s up</p>}
                </Card.Deadlines>
              )}
        </Card.Footer>
      </Card>
      <KanbanForm modalProps={cardModalEditProps} card={card} id={id} />
    </div>
  )
}

export default KanbanCard
