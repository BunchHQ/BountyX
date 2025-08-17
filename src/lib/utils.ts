import { BountyStatus, Item } from "@prisma/client"
import { clsx, type ClassValue } from "clsx"
import { DateTime, Interval } from "luxon"
import { twMerge } from "tailwind-merge"
import { bountyStatuses, itemTypes } from "./data"

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
  return itemTypes[item] ?? "???"
}

export const formatBountyStatus = (status: BountyStatus): string => {
  return bountyStatuses[status] ?? "???"
}

export const toDateTime = (date: Date) => {
  const luxonDate = DateTime.fromJSDate(date)
  if (!luxonDate.isValid) {
    throw new Error(`Invalid date: ${date}`)
  }
  return luxonDate
}

export const formatDateTime = (date: Date | DateTime) => {
  if (date instanceof DateTime) {
    return date.toLocaleString({ dateStyle: "medium", timeStyle: "short" })
  }
  return toDateTime(date).toLocaleString({ dateStyle: "medium", timeStyle: "short" })
}

export const formatDateTimeToRelative = (date: Date) => {
  return toDateTime(date).toRelative()
}

export const formatDeadline = (deadline: number) => {
  return Interval.fromDateTimes(DateTime.fromSeconds(0), DateTime.fromSeconds(deadline))
    .toDuration(["days", "hours", "minutes", "second"])
    .toHuman({
      showZeros: false,
      unitDisplay: "short",
    })
}

export const formatDeadlineToRelative = (date: Date, deadline: number) => {
  return toDateTime(date).plus({ second: deadline }).toRelative()
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
