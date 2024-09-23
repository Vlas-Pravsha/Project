'use client'

import { Button, Select } from '@/components/ui'
import { hobbiesOptions, skillsOptions } from '@/constants/skillAndHobbies'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import type { OptionItem } from '@/components/ui/Select'

export interface RegisterItem {
  skills: OptionItem[]
  hobbies: OptionItem[]
}

const formSchema = z.object({
  skills: z.array(z.object({ label: z.string(), value: z.string() })).min(1, 'Please select at least one skill'),
  hobbies: z.array(z.object({ label: z.string(), value: z.string() })).min(1, 'Please select at least one hobby'),
})

type FormData = z.infer<typeof formSchema>

function SkillsAndHobbies() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: [skillsOptions[0]],
      hobbies: [hobbiesOptions[0]],
    },
  })

  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return (
    <form
      className="flex flex-col gap-6 bg-gray-darkest border border-opacity-medium rounded-lg p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-lg font-semibold">Skills & Hobbies</h2>
      <div>
        <h6 className="text-base font-medium pb-2">Select skills</h6>
        <Controller
          name="skills"
          control={control}
          render={({ field }) => (
            <Select
              multiple
              options={skillsOptions}
              {...field}
            />
          )}
        />
        {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>}
      </div>
      <div>
        <h6 className="text-base font-medium pb-2">Select hobbies</h6>
        <Controller
          name="hobbies"
          control={control}
          render={({ field }) => (
            <Select
              multiple
              options={hobbiesOptions}
              {...field}
            />
          )}
        />
        {errors.hobbies && <p className="text-red-500 text-sm mt-1">{errors.hobbies.message}</p>}
      </div>
      <Button type="submit" className="self-start">Save all</Button>
    </form>
  )
}

export default SkillsAndHobbies
