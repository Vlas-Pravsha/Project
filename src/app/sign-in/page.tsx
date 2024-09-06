'use client'

import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ToastContainer, toast } from 'react-toastify'

import { useRouter } from 'next/navigation'

import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

import 'react-toastify/dist/ReactToastify.css'

export default function SignInPage() {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const schema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  })

  type FormData = z.infer<typeof schema>

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data)
  }

  return (
    <div className="flex items-center justify-between min-h-screen bg-white text-black">
      <div className="custom-gradient w-full flex min-h-screen justify-center items-center flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg p-10 bg-white rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-center">signin</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="email@example.com"
                {...register('email')}
                className=" border-gray-700 text-black"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">

              <Input
                type="password"
                placeholder="your very secret password"
                {...register('password')}
                className=" border-gray-700 text-black"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>
          </div>
          <Button
            variant="default"
            size="lg"
            type="submit"
            disabled={loading}
            className="w-full mt-6"
          >
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </form>
        <ToastContainer position="bottom-right" autoClose={5000} />
      </div>
    </div>
  )
}
