import { Card } from '@/components/ui/'
import { SquarePen } from 'lucide-react'
import React from 'react'

function KanbanCard() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <Card.Header>
          <Card.Title>Something</Card.Title>
          <SquarePen className="w-5 h-5" />
        </Card.Header>
        <Card.Image src="task-1.jpg" alt="Task Image" />
        <Card.Description>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis molestias natus ipsam ipsa, repudiandae
          aliquam recusandae recusandae!
        </Card.Description>
        <div className="w-full flex justify-end">
          <Card.Deadlines>22 days left</Card.Deadlines>
        </div>
      </Card>
      <Card>
        <Card.Header>
          <Card.Title>Something</Card.Title>
          <SquarePen className="w-5 h-5" />
        </Card.Header>
        <Card.Description>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis molestias natus ipsam ipsa, repudiandae
          aliquam recusandae recusandae!
        </Card.Description>
        <div className="w-full flex justify-end">
          <Card.Deadlines>7 days left</Card.Deadlines>
        </div>
      </Card>
    </div>
  )
}

export default KanbanCard
