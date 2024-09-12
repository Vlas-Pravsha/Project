import { Button, Input, Label, Modal, Textarea } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ModalProps } from '@/hooks/useModal'

interface FormModalProps {
  formModalProps: ModalProps
}

const productSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().min(1, 'Brand is required'),
  price: z.string().min(1, 'Price is required'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
})

type ProductFormData = z.infer<typeof productSchema>

function FormModal({ formModalProps }: FormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  })

  const onSubmit = (data: ProductFormData) => {
    // eslint-disable-next-line no-console
    console.log(data)
    formModalProps.onClose()
  }

  useEffect(() => {
    if (formModalProps.open) {
      reset()
    }
  }, [formModalProps.open])

  return (
    <Modal {...formModalProps} onClose={formModalProps.onClose}>
      <Modal.Content className="w-[640px]">
        <div className="flex justify-between pb-6 border-b border-gray100Opacity">
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
            <Label title="Product Name" errorText={errors.productName?.message} hasError={errors.productName}>
              <Input placeholder="Apple iMac 27" {...register('productName')} hasError={errors.productName} />
            </Label>
            <Label title="Category" errorText={errors.category?.message} hasError={errors.category}>
              <Input placeholder="Electronics" {...register('category')} hasError={errors.category} />
            </Label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Label title="Brand" errorText={errors.brand?.message} hasError={errors.brand}>
              <Input placeholder="Apple" {...register('brand')} hasError={errors.brand} />
            </Label>
            <Label title="Price" errorText={errors.price?.message} hasError={errors.price}>
              <Input placeholder="2300" type="text" {...register('price')} hasError={errors.price} />
            </Label>
          </div>
          <Label title="Product Description" errorText={errors.description?.message} hasError={errors.description}>
            <Textarea
              {...register('description')}
              hasError={errors.description}
              placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
              rows={5}
            />
          </Label>
          <Modal.Footer className="flex justify-between pt-6 border-t border-gray100Opacity">
            <Button type="submit" variant="primary">Add product</Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal>
  )
}

export default FormModal
