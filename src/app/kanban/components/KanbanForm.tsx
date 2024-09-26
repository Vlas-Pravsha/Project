'use client'

import { Button, Input, Label, Modal, Textarea, Upload } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ModalProps } from '@/hooks/useModal'

interface FormModalProps {
  cardModalProps: ModalProps
  setCards: any
}

const cardSchema = z.object({
  title: z.string().min(2, 'Product name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  deadlines: z.string().min(1, 'Deadlines is required'),
  image: z.any().optional(),
})

export type CardFormData = z.infer<typeof cardSchema>

function KanbanForm({ cardModalProps, setCards }: FormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
  })

  const onSubmit = (data: CardFormData) => {
    cardModalProps.onClose()
    setCards(data)
    console.log(data)
  }

  useEffect(() => {
    if (cardModalProps.open) {
      reset()
    }
  }, [cardModalProps.open, reset])

  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    cardModalProps.onClose()
  }

  return (
    <Modal {...cardModalProps} onClose={cardModalProps.onClose}>
      <Modal.Content className="w-[640px] p-6">
        <div className="flex justify-between pb-6 border-b border-opacity-medium">
          <h4 className="text-xl font-semibold">Add new task</h4>
          <Image
            src="/exit.svg"
            alt="Exit"
            className="h-5 w-5 hover:cursor-pointer"
            onClick={cardModalProps.onClose}
            width="20"
            height="20"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex gap-4">
            <Label title="Task Name" className="w-9/12" errorText={errors.title?.message} hasError={errors.title}>
              <Input placeholder="Apple iMac 27" {...register('title')} hasError={errors.title} />
            </Label>
            <Label title="Deadlines" className="w-3/12" errorText={errors.deadlines?.message} hasError={errors.deadlines}>
              <Input placeholder="7 days left" {...register('deadlines')} hasError={errors.deadlines} />
            </Label>
          </div>
          <Label title="Task Description" errorText={errors.description?.message} hasError={errors.description}>
            <Textarea
              {...register('description')}
              hasError={errors.description}
              placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
              rows={5}
            />
          </Label>
          <Upload {...register('image')}>Drop files to upload</Upload>
          <Modal.Footer className="flex pt-6 border-t border-opacity-medium">
            <Button type="submit" variant="primary" iconBefore={<Plus className="w-4 h-4" color="white" />}>Add card</Button>
            <Button variant="secondary" onClick={event => handleCloseModal(event)}>Close</Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal>
  )
}

export default KanbanForm
