'use client'

import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Chrome, Eye, EyeOff, Github } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

import 'react-toastify/dist/ReactToastify.css'

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  confirmPassword: z.string().min(6, { message: 'Please confirm your password' }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords don\'t match',
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

export default function SignUp() {
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log()
  }

  return (
    <div className="flex items-center justify-between min-h-screen bg-white text-black">
      <div className="custom-gradient w-full flex justify-center min-h-screen  items-center flex-col gap-12">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg p-10 bg-white rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold mb-2 text-center">Create an account</h2>
          <p className="text-sm text-gray-400 mb-6 text-center">Enter your email below to create your account</p>
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
                type="text"
                placeholder="your first perfect name"
                {...register('firstName')}
                className=" border-gray-700 text-black"
              />
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="your second amazing name"
                {...register('lastName')}
                className=" border-gray-700 text-black"
              />
              {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="your very secret password"
                  {...register('password')}
                  className=" border-gray-700 text-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOff size={20} color="black" /> : <Eye size={20} color="black" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>
            <div className="space-y-2">

              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="confirm your password dude"
                  {...register('confirmPassword')}
                  className=" border-gray-700 text-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOff size={20} color="black" /> : <Eye size={20} color="black" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <Button type="submit" size="lg" variant="secondary" className="w-full mt-6 bg-white text-black hover:bg-gray-200">
            {loading ? 'Loading...' : 'Sign Up'}
          </Button>

          <p className="text-sm text-center mt-4">
            <Link href="/sign-in" className="text-gray-400 hover:underline">have account already</Link>
          </p>
          <p className="text-xs text-center text-gray-400 mt-6">
            By clicking continue, you agree to our
            {' '}
            <a href="#" className="underline">Terms of Service</a>
            {' '}
            and
            {' '}
            <a href="#" className="underline">Privacy Policy</a>
            {' '}
            .
          </p>
        </form>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  )
}
