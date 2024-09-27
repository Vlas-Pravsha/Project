'use client'

import { Button, Upload } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const schema = z.object({
  image: z
    .custom<FileList>()
    .transform(file => file.length > 0 && file.item(0))
    .refine(file => !file || (!!file && file.size <= 5 * 1024 * 1024), {
      message: 'The profile picture must be a maximum of 5MB.',
    })
    .refine(file => !file || (!!file && file.type?.startsWith('image')), {
      message: 'Only images are allowed to be sent.',
    }),
})

export type UserImageData = z.infer<typeof schema>

function UserImageUpload() {
  const [preview, setPreview] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserImageData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: UserImageData) => {
    const file = data.image
    if (file) {
      const urlImage = URL.createObjectURL(file)
      setPreview(urlImage)
      // eslint-disable-next-line no-console
      console.log(data)
    }
  }

  const handleResetForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    setPreview('')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 bg-gray-darkest border border-opacity-medium rounded-lg p-6">
      {preview === ''
        ? (
            <Upload
              className="w-28 h-28"
              {...register('image')}
              hasError={errors.image}
            />
          )
        : <Image src={preview} width={112} height={112} alt="User Image" className="w-28 h-28" />}
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">Profile picture</h2>
          <p className="text-sm text-gray-medium">
            JPG, GIF or PNG. Max size of 800KB
          </p>
          {errors.image ? <p className="text-danger text-xs">{errors.image.message}</p> : null}
        </div>
        <div className="flex gap-4">
          <Button variant="primary" size="sm" type="submit">
            Upload image
          </Button>
          <Button variant="secondary" size="sm" onClick={handleResetForm}>
            Delete
          </Button>
        </div>
      </div>
    </form>
  )
}

export default UserImageUpload
