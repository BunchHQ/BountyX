"use server"

import type { BountyCreateType, BountyWithMessage } from "@/lib/types"
import { db } from "@/server/db"
import { BountyStatus, type Bounty } from "@prisma/client"
import { revalidatePath } from "next/cache"

/**
 * Create a new bounty
 */
export async function createBounty(bountyData: BountyCreateType): Promise<BountyWithMessage> {
  try {
    console.debug("Creating bounty with data:", bountyData)

    const bounty: Bounty = await db.bounty.create({
      data: bountyData,
    })

    revalidatePath(`/`, "page")
    revalidatePath(`/bounty/${bounty.id}`, "page")
    revalidatePath(`/profile`, "page")

    return { bounty, message: "Bounty offered successfully!" }
  } catch (error) {
    console.error("Failed to create bounty:", error)
    return { bounty: null, message: "Failed to offer bounty. Please try again after sometime." }
  }
}

/**
 *
 * @param id Bounty ID
 * @returns The Bounty object
 */
export async function getBountyById(id: string): Promise<Bounty | null> {
  try {
    const bounty: Bounty | null = await db.bounty.findUnique({
      where: {
        id,
      },
    })

    return bounty
  } catch (error) {
    console.error("Failed to get bounty by id:", error)
    return null
  }
}

/**
 *
 * @returns Array of all bounties
 */
export async function getAllBounties(): Promise<Bounty[] | null> {
  try {
    const bounties: Array<Bounty> | null = await db.bounty.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return bounties
  } catch (error) {
    console.error("Failed to get all bounties:", error)
    return null
  }
}

/**
 *
 * @param bountyId The Bounty ID to update
 * @param bountyData Bounty data to update
 * @returns Updated Bounty
 */
export async function updateBounty(
  bountyId: string,
  bountyData: Partial<BountyCreateType>,
): Promise<Bounty | null> {
  try {
    console.debug("Updating bounty with id:", bountyId, "and data:", bountyData)

    const bounty: Bounty = await db.bounty.update({
      where: {
        id: bountyId,
      },
      data: bountyData,
    })

    revalidatePath(`/`, "page")
    revalidatePath(`/bounty/${bounty.id}`, "page")
    revalidatePath(`/profile`, "page")

    return bounty
  } catch (error) {
    console.error("Failed to update bounty:", error)
    return null
  }
}

/**
 *
 * @param bountyId The Bounty ID to claim
 * @param userId User ID of user claiming the bounty
 * @returns Updated Bounty
 */
export async function claimBounty(bountyId: string, userId: string): Promise<BountyWithMessage> {
  try {
    const bounty: Bounty | null = await getBountyById(bountyId)

    if (bounty === null) {
      return { bounty: null, message: "Bounty not found." }
    }

    if (bounty.status === BountyStatus.CLAIMED) {
      if (bounty.claimerId! === userId) {
        return { bounty: null, message: "You have already claimed this bounty." }
      } else {
        return { bounty: null, message: "Bounty already claimed." }
      }
    }

    if (bounty.posterId === userId) {
      return { bounty: null, message: "Cannot claim own bounty." }
    }

    console.debug("Claiming bounty with id:", bountyId, "for user:", userId)

    const updatedBounty: Bounty = await db.bounty.update({
      where: {
        id: bountyId,
      },
      data: {
        status: BountyStatus.CLAIMED,
        claimerId: userId,
        claimedAt: new Date(),
      },
    })

    revalidatePath(`/`, "layout")
    revalidatePath(`/`, "page")
    revalidatePath(`/bounty/${updatedBounty.id}`, "page")
    revalidatePath(`/profile`, "page")

    return { bounty: updatedBounty, message: "Bounty Claimed. Now complete it!" }
  } catch (error) {
    console.error("Failed to claim bounty:", error)
    return { bounty: null, message: "Failed to claim bounty. Please try again." }
  }
}

/**
 *
 * @param userId User ID
 * @returns count of posted bounties by user
 */
export async function getPostedBountyCountByUserId(userId: string): Promise<number> {
  try {
    return await db.bounty.count({
      where: { posterId: userId },
    })
  } catch (error) {
    console.error("Error fetching count:", error)
    return 0
  }
}

/**
 *
 * @param userId User ID
 * @returns count of claimed bounties by user
 */
export async function getClaimedBountyCountByUserId(userId: string): Promise<number> {
  try {
    return await db.bounty.count({
      where: { claimerId: userId },
    })
  } catch (error) {
    console.error("Error fetching count:", error)
    return 0
  }
}
