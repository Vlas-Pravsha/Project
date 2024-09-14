'use client'

import { Button, Input, Label, Modal } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { v1 } from 'uuid'
import { z } from 'zod'

const schema = z.object({
  Name: z.string().min(1, 'Name is required').max(20, 'Max 20 characters'),
  Sername: z.string().min(1, 'Surname is required').max(20, 'Max 20 characters'),
  Country: z.string().min(1, 'Country is required'),
  City: z.string().min(1, 'City is required'),
  Address: z.string().min(1, 'Address is required'),
  Number: z.string().min(10, 'Invalid phone number').regex(/^\d+$/, 'Invalid number'),
  Email: z.string().email('Invalid email'),
  Birthday: z.string().min(1, 'Birthday is required'),
  Organization: z.string().optional(),
  Role: z.string().optional(),
  Department: z.string().optional(),
  Code: z.string().optional(),
})

type formData = z.infer<typeof schema>

function General() {
  const [_, setData] = React.useState<formData>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: formData) => {
    setData(data)
  }

  const inputsArray = [
    {
      id: v1(),
      errorText: 'Invalid name',
      title: 'First name',
      text: 'Tip',
      hasError: errors.Name,
      placeholder: 'Bonnie',
      register: 'Name' as keyof formData,
    },
    {
      id: v1(),
      errorText: 'Invalid surname',
      title: 'Last name',
      text: 'Tip',
      hasError: errors.Sername,
      placeholder: 'Green',
      register: 'Sername' as keyof formData,
    },
    {
      id: v1(),
      errorText: 'Invalid country',
      title: 'Country',
      text: 'Tip',
      hasError: errors.Country,
      placeholder: 'United States',
      register: 'Country' as keyof formData,
    },
    {
      id: v1(),
      errorText: 'Invalid city',
      title: 'City',
      text: 'Tip',
      hasError: errors.City,
      placeholder: 'New York',
      register: 'City' as keyof formData,
    },
    {
      id: v1(),
      errorText: 'Invalid address',
      title: 'Address',
      text: 'Tip',
      hasError: errors.Address,
      placeholder: 'e.g. San Francisco',
      register: 'Address' as keyof formData,
    },
    {
      id: v1(),
      errorText: 'Invalid email',
      title: 'Email',
      text: 'Tip',
      hasError: errors.Email,
      placeholder: 'example@company.com',
      register: 'Email' as keyof formData,
    },
    {
      id: v1(),
      errorText: 'Invalid number',
      title: 'Number',
      text: 'Tip',
      hasError: errors.Number,
      placeholder: 'e.g. 123 456 7890',
      register: 'Number' as keyof formData,
    },
    {
      id: v1(),
      errorText: 'Invalid birthday',
      title: 'Birthday',
      text: 'Tip',
      hasError: errors.Birthday,
      placeholder: 'e.g. 01/01/2000',
      register: 'Birthday' as keyof formData,
    },
    {
      id: v1(),
      errorText: 'Invalid organization',
      title: 'Organization',
      text: 'Tip',
      hasError: errors.Organization,
      placeholder: 'Company Name',
      register: 'Organization' as keyof formData,
    },
    {
      id: v1(),
      errorText: 'Invalid role',
      title: 'Role',
      text: 'Tip',
      hasError: errors.Role,
      placeholder: 'React Developer',
      register: 'Role' as keyof formData,
    },
    {
      id: v1(),
      errorText: 'Invalid department',
      title: 'Department',
      text: 'Tip',
      hasError: errors.Department,
      placeholder: 'Development',
      register: 'Department' as keyof formData,
    },
    {
      id: v1(),
      errorText: 'Invalid code',
      title: 'Code',
      text: 'Tip',
      hasError: errors.Code,
      placeholder: 'e.g. 123456',
      register: 'Code' as keyof formData,
    },
  ]

  return (
    <div className="w-full bg-gray800 border border-gray100Opacity rounded-lg p-6">
      <form
        className="w-full flex flex-col gap-6 p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl font-semibold">
          General information
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {inputsArray.map(item => (
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
        <Button variant="primary" size="md" className="w-32">Save all</Button>
      </form>
    </div>

  )
}

export default General
