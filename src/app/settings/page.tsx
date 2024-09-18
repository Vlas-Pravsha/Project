'use client'

import Footer from '@/components/layout/Footer'
import { Button, Input, Label } from '@/components/ui'
import { usePasswordVisibility } from '@/hooks/'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import type { MouseEvent } from 'react'
import General from './components/General'

const schema = z.object({
  email: z.string().email({ message: 'Incorrect email format' }),
  currentPassword: z.string().min(8, { message: 'Password must contain a minimum of 8 characters' }),
  newPassword: z.string().min(8, { message: 'Password must contain a minimum of 8 characters' }),
})

type FormData = z.infer<typeof schema>

function UserSetting() {
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
      email: '',
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
    <div className="w-full flex flex-col gap-4 p-4">
      <div className="w-full flex flex-row gap-4">
        <div className="flex flex-col gap-4 min-w-[30%]">
          <div className="flex gap-5 bg-gray-darkest  border border-opacity-medium rounded-lg p-6">
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
                <Button variant="primary" size="sm">Upload Picture</Button>
                <Button variant="secondary" size="sm">Delete</Button>
              </div>
            </div>
          </div>
          <div className="bg-gray-darkest  rounded-lg w-full  p-6">
            <h2 className="text-2xl font-bold mb-6">Personal data</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Label errorText={errors.email?.message} hasError={errors.email} title="Your e-mail">
                <Input hasError={errors.email} placeholder="email" type="text" id="email" {...register('email')} />
              </Label>
              <div>
                <h3 className="text-xl font-semibold mb-4">Пароль</h3>
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
        </div>
        <General />
      </div>
      <Footer />
    </div>
  )
}

export default UserSetting
