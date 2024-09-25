'use client'

import React, { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import KanbanCard from './KanbanCard'
import type { CardType, ColumnType } from '../page'

interface ColumnProps {
  title: string
  headingColor: string
  cards: CardType[]
  column: ColumnType
  setCards: Dispatch<SetStateAction<CardType[]>>
}

function Column({ title, headingColor, cards, column, setCards }: ColumnProps) {
  const [active, setActive] = useState(false)

  const handleDragStart = (e: React.DragEvent, card: Omit<CardType, 'image'>) => {
    e.dataTransfer.setData('cardId', card.id)
  }

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`))
  }

  const highlightIndificator = (e: React.DragEvent) => {
    const indicators = getIndicators()
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    highlightIndificator(e)
    setActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setActive(false)
  }

  const handleDragEnd = (e: React.DragEvent) => {
    e.preventDefault()
    setActive(false)
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
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors ${
          active ? 'bg-zinc-800' : 'bg-neutral-800/0'
        }`}
      >
        {filteredCards.map((c) => {
          return (
            <KanbanCard
              key={c.id}
              handleDragStart={handleDragStart}
              {...c}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Column
