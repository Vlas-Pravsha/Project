import { Button, Form, Input, Modal, Textarea } from '@/components/ui'
import { useProducts } from '@/contexts/'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ProductItem } from '@/contexts/'
import type { ModalProps } from '@/hooks/useModal'

interface FormModalProps {
  modalProps: ModalProps
  id?: string
  product?: ProductItem
}

const productSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  category: z.string().min(2, 'Category is required'),
  technology: z.string().min(2, 'Technology is required'),
  price: z.number().min(1, 'Price is required'),
  discount: z.string().min(2, 'Discount is required'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
})

export type ProductFormData = z.infer<typeof productSchema>

function FormModal({ modalProps, product, id }: FormModalProps) {
  const { addProduct, updateProduct } = useProducts()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductItem>({
    resolver: zodResolver(productSchema),
    defaultValues: product,
  })

  const onSubmit = (data: ProductItem) => {
    if (product) {
      updateProduct(data, id!)
    }
    else {
      addProduct(data)
    }
    modalProps.onClose()
  }

  useEffect(() => {
    if (modalProps.open) {
      reset()
    }
  }, [modalProps.open, product, reset])

  return (
    <Modal {...modalProps} onClose={modalProps.onClose}>
      <Modal.Content className="w-[640px] p-6">
        <div className="flex justify-between pb-6 border-b border-opacity-medium">
          <h4 className="text-xl font-semibold">{product ? 'Edit Product' : 'Add Product'}</h4>
          <Image
            src="/exit.svg"
            alt="Exit"
            className="h-5 w-5 hover:cursor-pointer"
            onClick={modalProps.onClose}
            width="20"
            height="20"
          />
        </div>

        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-6">
            <Form.Field>
              <Form.Label>Product Name</Form.Label>
              <Form.Control>
                <Input placeholder="Apple iMac 27" {...register('name')} hasError={errors.name} />
              </Form.Control>
              {errors.name && <Form.ErrorMessage>{errors.name.message}</Form.ErrorMessage>}
            </Form.Field>

            <Form.Field>
              <Form.Label>Category</Form.Label>
              <Form.Control>
                <Input placeholder="Electronics" {...register('category')} hasError={errors.category} />
              </Form.Control>
              {errors.category && <Form.ErrorMessage>{errors.category.message}</Form.ErrorMessage>}
            </Form.Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Field>
              <Form.Label>Technology</Form.Label>
              <Form.Control>
                <Input placeholder="Apple" {...register('technology')} hasError={errors.technology} />
              </Form.Control>
              {errors.technology && <Form.ErrorMessage>{errors.technology.message}</Form.ErrorMessage>}
            </Form.Field>

            <Form.Field>
              <Form.Label>Price</Form.Label>
              <Form.Control>
                <Input
                  placeholder="2300"
                  type="text"
                  {...register('price', { valueAsNumber: true })}
                  hasError={errors.price}
                />
              </Form.Control>
              {errors.price && <Form.ErrorMessage>{errors.price.message}</Form.ErrorMessage>}
            </Form.Field>
          </div>

          <Form.Field>
            <Form.Label>Discount</Form.Label>
            <Form.Control>
              <Input
                placeholder="15%"
                type="text"
                {...register('discount')}
                hasError={errors.discount}
              />
            </Form.Control>
            {errors.discount && <Form.ErrorMessage>{errors.discount.message}</Form.ErrorMessage>}
          </Form.Field>

          <Form.Field>
            <Form.Label>Product Description</Form.Label>
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

          <Modal.Footer className="flex justify-between pt-6 border-t border-opacity-medium">
            <Button type="submit" variant="primary">
              {product ? 'Update product' : 'Add product'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default FormModal
