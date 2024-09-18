export interface AppError {
  message: string
}

export function getErrorMessage(error: unknown): AppError {
  if (error instanceof Error) {
    return { message: error.message }
  }

  return { message: 'An unknown error occurred' }
}
