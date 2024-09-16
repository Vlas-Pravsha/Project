import { cn } from '@/lib/utils'
import React from 'react'
import type { FC, HTMLAttributes, PropsWithChildren } from 'react'
import type { FieldError } from 'react-hook-form'
import { Label } from './Label'

const FormLayout: FC<PropsWithChildren & HTMLAttributes<HTMLFormElement>> = ({ children, className, ...props }) => {
  return (
    <form className={cn('w-full', className)} {...props}>
      {children}
    </form>
  )
}

function FormHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
}

function FormTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn('text-2xl font-bold', className)} {...props}>
      {children}
    </h2>
  )
}

function FormDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-gray-400 text-sm font-normal', className)} {...props}>
      {children}
    </p>
  )
}

interface FormLabelProps extends HTMLAttributes<HTMLLabelElement> {
  errorText?: string
  hasError?: FieldError
}

function FormLabel({ children, className, errorText, hasError, ...props }: FormLabelProps) {
  return (
    <Label className={cn('', className)} {...props} errorText={errorText} hasError={hasError}>
      {children}
    </Label>
  )
}

const Formcomponent: FC<PropsWithChildren & HTMLAttributes<HTMLFormElement>> = ({
  children,
  ...props
}) => {
  return (
    <FormLayout {...props}>
      {children}
    </FormLayout>
  )
}

export const Form = Object.assign(Formcomponent, {
  Header: FormHeader,
  Title: FormTitle,
  Description: FormDescription,
  Label: FormLabel,
})
