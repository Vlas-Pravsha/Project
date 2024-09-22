'use client'

import { Button, Label } from '@/components/ui'
import Select from '@/components/ui/Select'
import React from 'react'
import { useForm } from 'react-hook-form'

export interface RegisterItem {
  skills: string
  hobbies: string
}

function SkillsAndHobbies() {
  const [_, setData] = React.useState<RegisterItem>()
  const { register, handleSubmit } = useForm<RegisterItem>()

  const languageOptions = [
    { id: 1, value: 'English' },
    { id: 2, value: 'Spanish' },
  ]

  const timeOptions = [
    { id: 1, value: 'UTC' },
    { id: 2, value: 'PST' },
  ]

  const onSubmit = (formData: RegisterItem | undefined) => {
    if (formData) {
      setData(formData)
    }
  }

  return (
    <form className="flex flex-col gap-6 bg-gray-darkest border border-opacity-medium rounded-lg p-6" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-semibold">Skills & Hobbies</h2>
      <Label title="Select skills">
        <Select selectOptions={languageOptions} {...register('skills')} />
      </Label>
      <Label title="Select hobbies">
        <Select selectOptions={timeOptions} {...register('hobbies')} />
      </Label>
      <Button className="self-start">Save all</Button>
    </form>
  )
}

export default SkillsAndHobbies
