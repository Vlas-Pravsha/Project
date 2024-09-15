import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { Image } from 'lucide-react'
import React from 'react'
import type { FieldError } from 'react-hook-form'

interface UploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: FieldError | undefined
}

const uploadVariants = cva(
  'border-2 border-dashed rounded-lg text-center',
  {
    variants: {
      variant: {
        default: 'border-gray-100/50',
        error: 'border-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const Upload = React.forwardRef<HTMLInputElement, UploadProps>(
  ({ hasError, className, placeholder, ...props }, ref) => {
    const variant = hasError ? 'error' : 'default'
    return (
      <div className={cn(uploadVariants({ variant }), className)}>
        <input
          ref={ref}
          type="file"
          id="file-upload"
          className="hidden"
          {...props}
        />
        <label htmlFor="file-upload" className="cursor-pointer flex justify-center gap-2 px-4 py-10 items-center">
          <Image className="w-6 h-6 text-gray-400" />
          <span className="text-base text-gray-500">Drop files to upload</span>
        </label>
      </div>
    )
  },
)

Upload.displayName = 'Upload'
export { Upload }
