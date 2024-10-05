import { cn } from '@/lib/utils'
import * as React from 'react'

const FormLayout = React.forwardRef<
  HTMLFormElement,
  React.HTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => (
  <form
    ref={ref}
    className={cn('space-y-4', className)}
    {...props}
  />
))
FormLayout.displayName = 'FormLayout'

const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('space-y-2', className)}
    {...props}
  />
))
FormField.displayName = 'FormField'

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
    {...props}
  />
))
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mt-1', className)}
    {...props}
  />
))
FormControl.displayName = 'FormControl'

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
FormDescription.displayName = 'FormDescription'

const FormErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-danger text-xs ml-1.5', className)}
    {...props}
  >
    {children}
  </p>
))
FormErrorMessage.displayName = 'ErrorMessage'

const FormComponent = React.forwardRef<
  HTMLFormElement,
  React.HTMLAttributes<HTMLFormElement>
>(({ children, ...props }, ref) => (
  <FormLayout ref={ref} {...props}>
    {children}
  </FormLayout>
))

FormComponent.displayName = 'FormComponent'

export const Form = Object.assign(FormComponent, {
  Field: FormField,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  ErrorMessage: FormErrorMessage,
})
