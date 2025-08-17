"use server"

import type {
  BountyCreateType,
  BountyWithMessage,
  BountyWithPartialPoster,
  BountyWithPosterAndClaimer,
} from "@/lib/types"
import { db } from "@/server/db"
import { BountyStatus, type Bounty, type User } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { sendNotification } from "./notification"
import { getUserById } from "./user"
import { formatBountyItem } from "@/lib/utils"

/**
 * Create a new bounty
 */
export async function createBounty(bountyData: BountyCreateType): Promise<BountyWithMessage> {
  try {
    console.debug("Creating bounty with data:", bountyData)

    const bounty: Bounty = await db.bounty.create({
      data: bountyData,
    })

    revalidatePath(`/`)
    revalidatePath(`/bounty/${bounty.id}`)
    revalidatePath(`/profile`)

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
 * @param id Bounty ID
 * @returns The Bounty object with poster and claimer details
 */
export async function getBountyByIdWithPosterAndClaimer(
  id: string,
): Promise<BountyWithPosterAndClaimer | null> {
  try {
    const bounty: BountyWithPosterAndClaimer | null = await db.bounty.findUnique({
      where: {
        id,
      },
      include: {
        poster: true,
        claimer: true,
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
 * @returns Array of all bounties with partial poster details
 */
export async function getAllBountiesWithPartialPoster(): Promise<BountyWithPartialPoster[] | null> {
  try {
    const bounties: Array<BountyWithPartialPoster> | null = await db.bounty.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        poster: {
          select: {
            name: true,
          },
        },
      },
    })

    return bounties
  } catch (error) {
    console.error("Failed to get all bounties with partial poster:", error)
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

    revalidatePath(`/`)
    revalidatePath(`/bounty/${bounty.id}`)
    revalidatePath(`/profile`)

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
    const user: User | null = await getUserById(userId)

    if (bounty === null) {
      return { bounty: null, message: "Bounty not found." }
    }

    if (user === null) {
      return { bounty: null, message: "User not found." }
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

    revalidatePath(`/`)
    revalidatePath(`/bounty/${updatedBounty.id}`)
    revalidatePath(`/profile`)

    try {
      console.debug("Sending claimed notification to poster", updatedBounty.posterId!)
      await sendNotification(
        "Bounty Claimed",
        `Your bounty for ${formatBountyItem(updatedBounty.item)} was claimed by ${user.name}`,
        updatedBounty.posterId!,
      )
    } catch (notificationError) {
      console.error("Failed to send notification:", notificationError)
      // Continue execution even if notification fails
    }

    return { bounty: updatedBounty, message: "Bounty Claimed. Now complete it!" }
  } catch (error) {
    console.error("Failed to claim bounty:", error)
    return { bounty: null, message: "Failed to claim bounty. Please try again." }
  }
}

export async function cancelBountyById(id: string): Promise<BountyWithMessage> {
  try {
    console.debug("Cancelling bounty with id:", id)

    const updatedBounty: Bounty | null = await updateBounty(id, { status: BountyStatus.CANCELLED })

    if (!updatedBounty) {
      return { bounty: null, message: "Failed to withdraw bounty." }
    }

    revalidatePath(`/`)
    revalidatePath(`/bounty/${updatedBounty.id}`, "page")
    revalidatePath(`/profile`, "page")

    if (updatedBounty.claimerId !== null) {
      try {
        console.debug("Sending cancelled notification to claimer", updatedBounty.claimerId)
        await sendNotification(
          "Bounty Withdrawn",
          `Your claimed bounty for ${formatBountyItem(updatedBounty.item)} was withdrawn.`,
          updatedBounty.claimerId,
        )
      } catch (notificationError) {
        console.error("Failed to send notification:", notificationError)
        // Continue execution even if notification fails
      }
    }

    return { bounty: updatedBounty, message: "Bounty withdrawn successfully!" }
  } catch (error) {
    console.error("Failed to cancel bounty:", error)
    return { bounty: null, message: "Failed to withdraw bounty. Please try again." }
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
