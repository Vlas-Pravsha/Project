'use client'

import { Button, Form, Input, Modal, Textarea, Upload } from '@/components/ui'
import { useKanbanCard } from '@/contexts'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { CardType } from '@/contexts'
import type { ModalProps } from '@/hooks/useModal'

interface FormModalProps {
  modalProps: ModalProps
  card?: CardType
  id?: string
}

const cardSchema = z.object({
  title: z.string().min(2, 'Product name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  deadlines: z.number().min(1, 'Deadlines is required'),
  image: z.any().optional(),
})

export type CardFormData = z.infer<typeof cardSchema>

function KanbanForm({ card, modalProps, id }: FormModalProps) {
  const { addCard, updateCard } = useKanbanCard()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
    defaultValues: card,
  })

  const onSubmit = (data: CardFormData) => {
    if (card) {
      updateCard(data, id!)
    }
    else {
      addCard(data)
    }
    modalProps.onClose()
  }

  useEffect(() => {
    if (modalProps.open) {
      reset()
    }
  }, [modalProps.open, reset])

  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    modalProps.onClose()
  }

  return (
    <Modal {...modalProps} onClose={modalProps.onClose}>
      <Modal.Content className="w-[640px] p-6">
        <div className="flex justify-between pb-6 border-b border-opacity-medium">
          <h4 className="text-xl font-semibold">
            {card ? 'Update task' : 'Add new task'}
          </h4>
          <Image
            src="/exit.svg"
            alt="Exit"
            className="h-5 w-5 hover:cursor-pointer"
            onClick={modalProps.onClose}
            width="20"
            height="20"
          />
        </div>

        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex gap-4">
            <Form.Field className="w-9/12">
              <Form.Label>Task Name</Form.Label>
              <Form.Control>
                <Input placeholder="Apple iMac 27" {...register('title')} hasError={errors.title} />
              </Form.Control>
              {errors.title && <Form.ErrorMessage>{errors.title.message}</Form.ErrorMessage>}
            </Form.Field>

            <Form.Field className="w-3/12">
              <Form.Label>Deadlines</Form.Label>
              <Form.Control>
                <Input
                  placeholder="7 days left"
                  {...register('deadlines', { valueAsNumber: true })}
                  hasError={errors.deadlines}
                />
              </Form.Control>
              {errors.deadlines && <Form.ErrorMessage>{errors.deadlines.message}</Form.ErrorMessage>}
            </Form.Field>
          </div>

          <Form.Field>
            <Form.Label>Task Description</Form.Label>
            <Form.Control>
              <Textarea
                {...register('description')}
                hasError={errors.description}
                placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
                rows={5}
              />
            </Form.Control>
            {errors.description && <Form.ErrorMessage>{errors.description.message}</Form.ErrorMessage>}
          </Form.Field>

          <Form.Field>
            <Form.Label>Upload Files</Form.Label>
            <Form.Control>
              <Upload {...register('image')}>Drop files to upload</Upload>
            </Form.Control>
          </Form.Field>

          <Modal.Footer className="flex pt-6 border-t border-opacity-medium">
            <Button type="submit" variant="primary" iconBefore={!card && <Plus className="w-4 h-4" color="white" />}>
              {card ? 'Update card' : 'Add card'}
            </Button>
            <Button variant="secondary" onClick={event => handleCloseModal(event)}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default KanbanForm
