'use client'

import { Button } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const schema = z.object({
  image: z
    .any()
    .refine(file => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
})

type FormData = z.infer<typeof schema>

function UserImageUpload() {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  const handleResetForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    reset()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 bg-gray-darkest  border border-opacity-medium rounded-lg p-6">
      <Image
        src="/neil-sims.png"
        alt="Avatar"
        height="112"
        width="112"
        className="w-28 h-28 rounded-lg"
        priority
      />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">Profile picture</h2>
          <p className="text-sm text-gray-medium">
            JPG, GIF or PNG. Max size of 800K
          </p>
        </div>
        <div className="flex gap-4">
          <div className="rounded-lg text-center" {...register('image')}>
            <input
              type="file"
              id="file-upload"
              className="hidden"
            />
            <Button variant="primary" size="sm">
              <label htmlFor="file-upload" className="cursor-pointer flex justify-center items-center">
                Upload Picture
              </label>
            </Button>
          </div>
          <Button variant="secondary" size="sm" onClick={event => handleResetForm(event)}>Delete</Button>
        </div>
      </div>
    </form>
  )
}

export default UserImageUpload
