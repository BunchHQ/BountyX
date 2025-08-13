import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message)
    return { errorMessage: error.message }
  } else {
    console.error(error)
    return { errorMessage: "An unknown error occurred" }
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
