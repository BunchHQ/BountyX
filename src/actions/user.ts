import { db } from "@/server/db"
import type { User } from "@prisma/client"

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
