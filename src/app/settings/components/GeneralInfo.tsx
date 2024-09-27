'use client'

import { Button, Input, Label, Textarea } from '@/components/ui'
import { inputsArray } from '@/constants/general'
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
  const [_, setData] = React.useState<GeneralFormData>()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GeneralFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: GeneralFormData) => {
    // eslint-disable-next-line no-console
    console.log(data)
    setData(data)
  }

  const handleResetForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    reset()
  }

  return (
    <div className="w-full bg-gray-darkest  border border-opacity-medium rounded-lg p-6">
      <form
        className="w-full flex flex-col gap-6 p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl font-semibold">
          General information
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {inputsArray(errors).map(item => (
            <Label
              key={item.id}
              title={item.title}
              errorText={item.errorText}
              hasError={item.hasError}
            >
              <Input
                hasError={item.hasError}
                placeholder={item.placeholder}
                {...register(item.register)}
              />
            </Label>
          ))}
        </div>
        <Label title="About me" errorText={errors.aboutMe?.message} hasError={errors.aboutMe}>
          <Textarea
            {...register('aboutMe')}
            hasError={errors.aboutMe}
            placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
            rows={4}
          />
        </Label>
        <div className="flex gap-4">
          <Button variant="primary" size="md" className="w-32">Save all</Button>
          <Button variant="secondary"onClick={event => handleResetForm(event)}>
            Clear
          </Button>
        </div>
      </form>
    </div>
  )
}

export default GeneralInfo
