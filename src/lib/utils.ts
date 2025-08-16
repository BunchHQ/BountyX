import { Item, BountyStatus } from "@prisma/client"
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

export const formatBountyItem = (item: Item): string => {
  switch (item) {
    case Item.STATIONERY:
      return "Stationery"
    case Item.MEDICINE:
      return "Medicine"
    case Item.FOOD:
      return "Food"
    case Item.TICKETS:
      return "Tickets"
    case Item.PURIFIED_WATER:
      return "Purified Water"
    case Item.GROCERY:
      return "Grocery"
    case Item.TRANSPORT:
      return "Transport"
    case Item.OTHER:
      return "Other"
    default:
      return "Unknown Item"
  }
}

export const formatBountyStatus = (status: BountyStatus): string => {
  switch (status) {
    case BountyStatus.OFFERED:
      return "Offered"
    case BountyStatus.CLAIMED:
      return "Claimed"
    case BountyStatus.COMPLETED:
      return "Completed"
    case BountyStatus.CANCELLED:
      return "Cancelled"
    default:
      return "Unknown Status"
  }
}

export function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
