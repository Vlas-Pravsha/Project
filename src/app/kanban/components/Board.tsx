import type { CardType } from '@/contexts'
import type { Dispatch, SetStateAction } from 'react'
import BurnBarrel from './BurnBarrel'
import Column from './Column'

interface BoardProps {
  cards: CardType[]
  setCards: Dispatch<SetStateAction<CardType[]>>
}

function Board({ cards, setCards }: BoardProps) {
  return (
    <div className="flex h-full w-full gap-6">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} />

    </div>
  )
}

export default Board
