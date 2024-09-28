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
    e.dataTransfer.setData('sourceColumn', card.column)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()

    const cardId = e.dataTransfer.getData('cardId')

    setCards((prevCards) => {
      const draggedCard = prevCards.find(card => card.id === cardId)
      if (!draggedCard)
        return prevCards

      const updatedCards = prevCards.filter(card => card.id !== cardId)
      const dropIndex = updatedCards.filter(card => card.column === column).length

      const newCard = { ...draggedCard, column }
      updatedCards.splice(dropIndex, 0, newCard)

      return updatedCards
    })
  }

  const handleCardDrop = (e: React.DragEvent, targetCardId: string) => {
    e.preventDefault()

    const cardId = e.dataTransfer.getData('cardId')

    setCards((prevCards) => {
      const draggedCard = prevCards.find(card => card.id === cardId)
      if (!draggedCard)
        return prevCards

      const updatedCards = prevCards.filter(card => card.id !== cardId)
      const dropIndex = updatedCards.findIndex(card => card.id === targetCardId)

      const newCard = { ...draggedCard, column }
      updatedCards.splice(dropIndex, 0, newCard)

      return updatedCards
    })
  }

  const filteredCards = cards.filter(c => c.column === column)

  return (
    <div>
      <div className="mb-3 gap-4 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="h-full w-full transition-colors"
      >
        {filteredCards.map((c) => {
          return (
            <div
              key={c.id}
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onDrop={e => handleCardDrop(e, c.id)}
            >
              <KanbanCard
                handleDragStart={handleDragStart}
                card={c}
                {...c}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Column
