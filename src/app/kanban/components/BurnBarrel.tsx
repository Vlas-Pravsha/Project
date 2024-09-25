import { Flame, Trash } from 'lucide-react'
import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { CardType } from '../page'

function BurnBarrel({ setCards }: { setCards: Dispatch<SetStateAction<CardType[]>> }) {
  const [active, setActive] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setActive(true)
  }

  const handleDragLeave = () => {
    setActive(false)
  }

  const handleDragEnd = (e: React.DragEvent) => {
    const cardId = e.dataTransfer.getData('cardId')
    setCards(pvev => pvev.filter(c => c.id !== cardId))
    setActive(false)
  }

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-72 w-1/5 shrink-0 place-content-center border-2 border-dashed  text-3xl ${
        active
          ? 'border-red-800 bg-red-800/20 text-red-500'
          : 'border-opacity-medium bg-transparent text-neutral-500'
      }`}
    >
      {active ? <Flame className="animate-bounce" /> : <Trash />}
    </div>
  )
}

export default BurnBarrel
