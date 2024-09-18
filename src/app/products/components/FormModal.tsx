import { Button, Input, Label, Modal, Textarea } from '@/components/ui'
import { useProducts } from '@/contexts/'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ProductItem } from '@/contexts/'
import type { ModalProps } from '@/hooks/useModal'

interface FormModalProps {
  formModalProps: ModalProps
}

const productSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  category: z.string().min(2, 'Category is required'),
  technology: z.string().min(2, 'Technology is required'),
  price: z.string().min(2, 'Price is required'),
  discount: z.string().min(2, 'Discount is required'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
})

export type ProductFormData = z.infer<typeof productSchema>

function FormModal({ formModalProps }: FormModalProps) {
  const { addProduct } = useProducts()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductItem>({
    resolver: zodResolver(productSchema),
  })

  const onSubmit = (data: ProductItem) => {
    addProduct(data)
    formModalProps.onClose()
  }

  useEffect(() => {
    if (formModalProps.open) {
      reset()
    }
  }, [formModalProps.open, reset])

  return (
    <Modal {...formModalProps} onClose={formModalProps.onClose}>
      <Modal.Content className="w-[640px] p-6">
        <div className="flex justify-between pb-6 border-b border-opacity-medium">
          <h4 className="text-xl font-semibold">Add Product</h4>
          <Image
            src="/exit.svg"
            alt="Exit"
            className="h-5 w-5 hover:cursor-pointer"
            onClick={formModalProps.onClose}
            width="20"
            height="20"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-6">
            <Label title="Product Name" errorText={errors.name?.message} hasError={errors.name}>
              <Input placeholder="Apple iMac 27" {...register('name')} hasError={errors.name} />
            </Label>
            <Label title="Category" errorText={errors.category?.message} hasError={errors.category}>
              <Input placeholder="Electronics" {...register('category')} hasError={errors.category} />
            </Label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Label title="Technology" errorText={errors.technology?.message} hasError={errors.technology}>
              <Input placeholder="Apple" {...register('technology')} hasError={errors.technology} />
            </Label>
            <Label title="Price" errorText={errors.price?.message} hasError={errors.price}>
              <Input placeholder="2300" type="text" {...register('price')} hasError={errors.price} />
            </Label>
          </div>
          <Label title="Discount" errorText={errors.discount?.message} hasError={errors.discount}>
            <Input placeholder="15%" type="text" {...register('discount')} hasError={errors.discount} />
          </Label>
          <Label title="Product Description" errorText={errors.description?.message} hasError={errors.description}>
            <Textarea
              {...register('description')}
              hasError={errors.description}
              placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
              rows={5}
            />
          </Label>
          <Modal.Footer className="flex justify-between pt-6 border-t border-opacity-medium">
            <Button type="submit" variant="primary">Add product</Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal>
  )
}

export default FormModal
