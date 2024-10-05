'use client'

import { Button, Form, Input, Textarea } from '@/components/ui'
import { inputsArray } from '@/constants/general'
import { useUserInfoContext } from '@/contexts/UserInfoContext'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  first_name: z.string().min(1, 'Name is required').max(20, 'Max 20 characters'),
  last_name: z.string().min(1, 'Surname is required').max(20, 'Max 20 characters'),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  address: z.string().min(1, 'Address is required'),
  number: z.string().min(10, 'Invalid phone number').regex(/^\d+$/, 'Invalid number'),
  education: z.string().min(1, 'Invalid Education'),
  birthday: z.string().min(1, 'Birthday is required'),
  organization: z.string().optional(),
  role: z.string().optional(),
  department: z.string().optional(),
  code: z.string().optional(),
  aboutMe: z.string(),
})

export type GeneralFormData = z.infer<typeof schema>

function GeneralInfo() {
  const { saveUserInfo } = useUserInfoContext()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GeneralFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: GeneralFormData) => {
    saveUserInfo(data)
  }

  const handleResetForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    reset()
  }

  return (
    <div className="w-full bg-gray-darkest border border-opacity-medium rounded-lg p-6">
      <Form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6 p-8">
        <h2 className="text-xl font-semibold">
          General information
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {inputsArray(errors).map(item => (
            <Form.Field key={item.id}>
              <Form.Label>{item.title}</Form.Label>
              <Form.Control>
                <Input
                  placeholder={item.placeholder}
                  {...register(item.register)}
                  hasError={item.hasError}
                />
              </Form.Control>
              {item.hasError && (
                <Form.ErrorMessage>{item.errorText}</Form.ErrorMessage>
              )}
            </Form.Field>
          ))}
        </div>

        <Form.Field>
          <Form.Label>About me</Form.Label>
          <Form.Control>
            <Textarea
              {...register('aboutMe')}
              hasError={errors.aboutMe}
              placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
              rows={4}
            />
          </Form.Control>
          {errors.aboutMe && (
            <Form.ErrorMessage>{errors.aboutMe.message}</Form.ErrorMessage>
          )}
        </Form.Field>

        <div className="flex gap-4">
          <Button variant="primary" size="md" className="w-32" type="submit">
            Save all
          </Button>
          <Button variant="secondary" onClick={event => handleResetForm(event)}>
            Clear
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default GeneralInfo
