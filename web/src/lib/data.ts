import type { BountyStatus, Item } from "@prisma/client"

export const ITEM_TYPE_ALL = "All"
export const STATUS_ALL = "All"

export const itemTypes: Record<Item, string> = {
  STATIONERY: "Stationary",
  FOOD: "Food",
  GROCERY: "Grocery",
  MEDICINE: "Medicine",
  PURIFIED_WATER: "Purified Water",
  TICKETS: "Tickets",
  TRANSPORT: "Transport",
  OTHER: "Other",
}

export const itemTypesReverse: Record<string, Item> = Object.fromEntries(
  Object.entries(itemTypes).map(([key, value]) => [value, key as Item]),
)

export const bountyStatuses: Record<BountyStatus, string> = {
  OFFERED: "Offered",
  CLAIMED: "Claimed",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
}

export const bountyStatusesReverse: Record<string, BountyStatus> = Object.fromEntries(
  Object.entries(bountyStatuses).map(([key, value]) => [value, key as BountyStatus]),
)
