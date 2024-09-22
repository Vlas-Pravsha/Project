'use client'

import { Button, Input, Label } from '@/components/ui'
import { usePasswordVisibility, useUser } from '@/hooks/'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import type { MouseEvent } from 'react'

const schema = z.object({
  currentPassword: z.string().min(8, { message: 'Password must contain a minimum of 8 characters' }),
  newPassword: z.string().min(8, { message: 'Password must contain a minimum of 8 characters' }),

})

type FormData = z.infer<typeof schema>

function ResetPassword() {
  const { user } = useUser()
  const currentPassword = usePasswordVisibility()
  const newPassword = usePasswordVisibility()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  })

  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  const handleResetForm = (event: MouseEvent) => {
    event.preventDefault()
    reset()
  }
  return (
    <div className="bg-gray-darkest border border-opacity-medium rounded-lg w-full p-6">
      <h2 className="text-2xl font-bold mb-6">Personal data</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Label title="Your e-mail">
          <Input placeholder="email" type="text" disabled defaultValue={user?.email} />
        </Label>
        <div>
          <h3 className="text-xl font-semibold mb-4">Password</h3>
          <div className="space-y-4">
            <Label errorText={errors.currentPassword?.message} hasError={errors.currentPassword} title="Current password">
              <div className="relative">
                <Input
                  hasError={errors.currentPassword}
                  placeholder="password"
                  type={currentPassword.inputType}
                  {...register('currentPassword')}
                />
                <button
                  onClick={currentPassword.togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-iconsColor cursor-pointer"
                >
                  {currentPassword.passwordShown ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </Label>
            <Label errorText={errors.newPassword?.message} hasError={errors.newPassword} title="New password">
              <div className="relative">
                <Input
                  hasError={errors.newPassword}
                  placeholder="password"
                  type={newPassword.inputType}
                  id="newPassword"
                  {...register('newPassword')}
                />
                <button
                  onClick={newPassword.togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-iconsColor cursor-pointer"
                >
                  {newPassword.passwordShown ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </Label>
          </div>
        </div>
        <div className="flex space-x-4">
          <Button type="submit" variant="primary">
            Save changes
          </Button>
          <Button
            variant="secondary"
            onClick={event => handleResetForm(event)}
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword
