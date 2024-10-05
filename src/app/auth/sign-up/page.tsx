'use client'

import { Button, Form, Input, Label } from '@/components/ui'
import { usePasswordVisibility } from '@/hooks'
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

import 'react-toastify/dist/ReactToastify.css' // імпорт твого кастомного Form компонента

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
  const currentPassword = usePasswordVisibility()
  const newPassword = usePasswordVisibility()

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

  return (
    <div className="flex items-center justify-between min-h-screen">
      <div className="custom-gradient w-full flex justify-center min-h-screen  items-center flex-col gap-12">
        <Form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg p-10 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold mb-2 text-center">Create an account</h2>
          <p className="text-sm text-gray-400 mb-6 text-center">Enter your email below to create your account</p>
          <Form.Field>
            <Form.Control>
              <Input type="text" placeholder="email@example.com" {...register('email')} />
            </Form.Control>
            {errors.email && <Form.ErrorMessage>{errors.email.message}</Form.ErrorMessage>}
          </Form.Field>

          <Form.Field>
            <Form.Control>
              <Input type="text" placeholder="your first perfect name" {...register('firstName')} />
            </Form.Control>
            {errors.firstName && <Form.ErrorMessage>{errors.firstName.message}</Form.ErrorMessage>}
          </Form.Field>

          <Form.Field>
            <Form.Control>
              <Input type="text" placeholder="your second amazing name" {...register('lastName')} />
            </Form.Control>
            {errors.lastName && <Form.ErrorMessage>{errors.lastName.message}</Form.ErrorMessage>}
          </Form.Field>

          <Form.Field>
            <Form.Control>
              <div className="relative">
                <Input
                  placeholder="your very secret password"
                  type={currentPassword.inputType}
                  {...register('password')}
                />
                <button
                  onClick={currentPassword.togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-iconsColor cursor-pointer"
                >
                  {currentPassword.passwordShown ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </Form.Control>
            {errors.password && <Form.ErrorMessage>{errors.password.message}</Form.ErrorMessage>}
          </Form.Field>

          <Form.Field>
            <Form.Control>
              <div className="relative">
                <Input
                  placeholder="confirm your password"
                  type={newPassword.inputType}
                  {...register('confirmPassword')}
                />
                <button
                  onClick={newPassword.togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-iconsColor cursor-pointer"
                >
                  {newPassword.passwordShown ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </Form.Control>
            {errors.confirmPassword && <Form.ErrorMessage>{errors.confirmPassword.message}</Form.ErrorMessage>}
          </Form.Field>

          <Button type="submit" size="lg" variant="primary" className="w-full mt-6">
            {loading ? 'Loading...' : 'Sign Up'}
          </Button>

          <p className="text-sm text-center mt-4">
            <Link href="/auth/login" className="text-gray-400 hover:underline">have account already</Link>
          </p>

          <div className="mt-6">
            <p className="text-sm text-center text-gray-400 mb-4">OR CONTINUE WITH</p>
            <div className="space-y-2">
              <Button variant="secondary" size="lg" onClick={handleGoogleSignIn} className="w-full bg-transparent border-gray-700 flex items-center justify-center">
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="secondary" size="lg" onClick={handleGithubSignIn} className="w-full bg-transparent border-gray-700 flex items-center justify-center">
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
            .
          </p>
        </Form>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} theme="colored" />
    </div>
  )
}
