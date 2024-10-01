'use client'

import type { CardType, ColumnType } from '@/contexts'
import type { Dispatch, SetStateAction } from 'react'
import KanbanCard from './KanbanCard'

interface ColumnProps {
  title: string
  headingColor: string
  cards: CardType[]
  column: ColumnType
  setCards: Dispatch<SetStateAction<CardType[]>>
}

function Column({ title, headingColor, cards, column, setCards }: ColumnProps) {
  const handleDragStart = (e: React.DragEvent, card: CardType) => {
    e.dataTransfer.setData('cardId', card.id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const cardId = e.dataTransfer.getData('cardId')

    setCards(prevCards =>
      prevCards.map(card => card.id === cardId ? { ...card, column } : card,
      ),
    )
  }

  const filteredCards = cards.filter(c => c.column === column)

  return (
    <div>
      <div className="mb-3 gap-6 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        className="h-full w-full transition-colors"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {filteredCards.map(c => (
          <div
            key={c.id}
          >
            <KanbanCard
              handleDragStart={e => handleDragStart(e, c)}
              card={c}
              {...c}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Column
