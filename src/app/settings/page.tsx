'use client'

import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const schema = z.object({
  email: z.string().email({ message: 'Неправильный формат email' }),
  currentPassword: z.string().min(8, { message: 'Пароль должен содержать минимум 8 символов' }),
  newPassword: z.string().min(8, { message: 'Пароль должен содержать минимум 8 символов' }),
})

type FormData = z.infer<typeof schema>

function UserSetting() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      currentPassword: '',
      newPassword: '',
    },
  })

  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-wrap flex-col gap-5 bg-[var(--component-bg)] border border-[var(--border-color)] rounded-lg p-6">
        <div className="flex items-center gap-5">
          <Image
            src="/neil-sims.png"
            alt="Avatar"
            height="112"
            width="112"
            className="w-28 h-28 rounded-lg"
          />
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold">Profile picture</h2>
              <p className="text-sm text-[var(--ligth-text-color)]">
                JPG, GIF or PNG. Max size of 800K
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="third">Upload Picture</Button>
              <Button variant="secondary">Delete</Button>
            </div>
          </div>
        </div>

        <div className="bg-[var(--component-bg)] rounded-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6">Personal data</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Your e-mail
              </label>
              <Input
                placeholder="email"
                type="text"
                id="email"
                {...register('email')}
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Пароль</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium mb-2">
                    Current password
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="password"
                      type={showCurrentPassword ? 'text' : 'password'}
                      id="currentPassword"
                      {...register('currentPassword')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--icons-color)] cursor-pointer"
                    >
                      {showCurrentPassword
                        ? <EyeOff size={20} onClick={() => setShowCurrentPassword(false)} />
                        : <Eye size={20} onClick={() => setShowCurrentPassword(true)} />}
                    </button>
                    {errors.currentPassword && (
                      <p className="text-red-600">{errors.currentPassword.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
                    New password
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="password"
                      type={showNewPassword ? 'text' : 'password'}
                      id="newPassword"
                      {...register('newPassword')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--icons-color)] cursor-pointer"
                    >
                      {showNewPassword
                        ? <EyeOff size={20} onClick={() => setShowNewPassword(false)} />
                        : <Eye size={20} onClick={() => setShowNewPassword(true)} />}
                    </button>
                    {errors.newPassword && (
                      <p className="text-red-600">{errors.newPassword.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button type="submit" variant="default">
                Save changes
              </Button>
              <Button type="button" variant="secondary">
                Clear
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />

    </div>
  )
}

export default UserSetting
