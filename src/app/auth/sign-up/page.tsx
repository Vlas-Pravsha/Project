'use client'

import { Button, Input, Label } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Chrome, Eye, EyeOff, Github } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'

import * as z from 'zod'
import type { MouseEvent } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { signup } from '../actions'

import { signInWithGithub, signInWithGoogle } from '../authUtils'

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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true)
    try {
      await signup({
        email: data.email,
        password: data.password,
        fullName: `${data.firstName} ${data.lastName}`,
      })
      toast.success('Account created successfully!')
      router.push('/')
    }
    catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create account. Please try again.')
    }
    finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async (event: MouseEvent) => {
    event.preventDefault()
    try {
      await signInWithGoogle()
    }
    catch (error) {
      console.error(error)
      toast.error('Failed to sign in with Google. Please try again.')
    }
  }

  const handleGithubSignIn = async (event: MouseEvent) => {
    event.preventDefault()
    try {
      await signInWithGithub()
    }

    catch (error) {
      console.error(error)
      toast.error('Failed to sign in with GitHub. Please try again.')
    }
  }

  const toggleCurrentPassword = (event: MouseEvent) => {
    event.preventDefault()
    setShowCurrentPassword(!showCurrentPassword)
  }

  const toggleNewPassword = (event: MouseEvent) => {
    event.preventDefault()
    setShowNewPassword(!showNewPassword)
  }

  return (
    <div className="flex items-center justify-between min-h-screen">
      <div className="custom-gradient w-full flex justify-center min-h-screen  items-center flex-col gap-12">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg p-10 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold mb-2 text-center">Create an account</h2>
          <p className="text-sm text-gray-400 mb-6 text-center">Enter your email below to create your account</p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label errorText={errors.email?.message} hasError={errors.email}>
                <Input type="text" placeholder="email@example.com" {...register('email')} hasError={errors.email} />
              </Label>
            </div>
            <div className="space-y-2">
              <Label errorText={errors.firstName?.message} hasError={errors.firstName}>
                <Input type="text" placeholder="your first perfect name" {...register('firstName')} hasError={errors.firstName} />
              </Label>
            </div>
            <div className="space-y-2">
              <Label errorText={errors.lastName?.message} hasError={errors.lastName}>
                <Input type="text" placeholder="your second amazing name" {...register('lastName')} hasError={errors.lastName} />
              </Label>
            </div>
            <div className="space-y-2">
              <Label errorText={errors.password?.message} hasError={errors.password}>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="your very secret password"
                    {...register('password')}
                    hasError={errors.password}
                  />
                  <button
                    onClick={event => toggleCurrentPassword(event)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-iconsColor cursor-pointer"
                  >
                    {showCurrentPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </Label>
            </div>
            <div className="space-y-2">
              <Label errorText={errors.confirmPassword?.message} hasError={errors.confirmPassword}>
                <div className="relative">
                  <Input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="confirm your password"
                    {...register('confirmPassword')}
                    hasError={errors.confirmPassword}
                  />
                  <button
                    onClick={event => toggleNewPassword(event)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-iconsColor cursor-pointer"
                  >
                    {showNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </Label>
            </div>
          </div>

          <Button type="submit" size="lg" variant="secondary" className="w-full mt-6 bg-white text-black hover:bg-gray-200">
            {loading ? 'Loading...' : 'Sign Up'}
          </Button>

          <p className="text-sm text-center mt-4">
            <Link href="/auth/login" className="text-gray-400 hover:underline">have account already</Link>
          </p>

          <div className="mt-6">
            <p className="text-sm text-center text-gray-400 mb-4">OR CONTINUE WITH</p>
            <div className="space-y-2">
              <Button variant="secondary" size="lg" onClick={event => handleGoogleSignIn(event)} className="w-full bg-transparent border-gray-700 flex items-center justify-center">
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="secondary" onClick={event => handleGithubSignIn(event)} size="lg" className="w-full bg-transparent border-gray-700 flex items-center justify-center">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </div>
          <p className="text-xs text-center text-gray-400 mt-6">
            By clicking continue, you agree to our&nbsp;
            <a href="#" className="underline">Terms of Service</a>
              &nbsp;and&nbsp;
            <a href="#" className="underline">Privacy Policy</a>
              &nbsp; .
          </p>
        </form>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  )
}
