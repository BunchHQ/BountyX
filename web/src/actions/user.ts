import type { UserWithBounties, UserWithClaimedBounties, UserWithPostedBounties } from "@/lib/types"
import { db } from "@/server/db"
import type { Bounty, User } from "@prisma/client"

/**
 * Fetches a user by their id
 */
export async function getUserById(id: string): Promise<User | null> {
  try {
    return await db.user.findUnique({
      where: { id },
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

/**
 * Fetches a user by their email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return await db.user.findUnique({
      where: { email },
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

/**
 *
 * @param id User ID
 * @returns User object with posted bounties
 */
export async function getUserByIdWithPostedBounties(
  id: string,
): Promise<UserWithPostedBounties | null> {
  try {
    return await db.user.findUnique({
      where: { id },
      include: { postedBounties: true },
    })
  } catch (error) {
    console.error("Error fetching user with posted bounties:", error)
    return null
  }
}

/**
 *
 * @param id User ID
 * @returns User object with claimed bounties
 */
export async function getUserByIdWithClaimedBounties(
  id: string,
): Promise<UserWithClaimedBounties | null> {
  try {
    return await db.user.findUnique({
      where: { id },
      include: { claimedBounties: true },
    })
  } catch (error) {
    console.error("Error fetching user with claimed bounties:", error)
    return null
  }
}

/**
 *
 * @param id User ID
 * @returns User object with related bounties
 */
export async function getUserByIdWithBounties(id: string): Promise<UserWithBounties | null> {
  try {
    return await db.user.findUnique({
      where: { id },
      include: { claimedBounties: true, postedBounties: true },
    })
  } catch (error) {
    console.error("Error fetching user with bounties:", error)
    return null
  }
}
