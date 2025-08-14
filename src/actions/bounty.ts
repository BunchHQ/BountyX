"use server"

import type { BountyCreateType } from "@/lib/types"
import { db } from "@/server/db"
import type { Bounty } from "@prisma/client"
import { revalidatePath } from "next/cache"

/**
 * Create a new bounty
 */
export async function createBounty(bountyData: BountyCreateType): Promise<Bounty> {
  try {
    console.log("Creating bounty with data:", bountyData)
    const bounty: Bounty = await db.bounty.create({
      data: bountyData,
    })

    revalidatePath(`/`, "page")
    revalidatePath(`/bounty/${bounty.id}`, "page")
    revalidatePath(`/profile`, "page")

    return bounty
  } catch (error) {
    console.error("Failed to create bounty:", error)
    throw new Error("Failed to create bounty")
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
    throw new Error("Failed to get bounty by id")
  }
}

/**
 *
 * @returns Array of all bounties
 */
export async function getAllBounties(): Promise<Bounty[]> {
  try {
    const bounties: Array<Bounty> | null = await db.bounty.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return bounties
  } catch (error) {
    console.error("Failed to get all bounties:", error)
    throw new Error("Failed to get all bounties")
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
): Promise<Bounty> {
  try {
    console.log("Updating bounty with id:", bountyId, "and data:", bountyData)
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
    throw new Error("Failed to update bounty")
  }
}

/**
 *
 * @param bountyId The Bounty ID to claim
 * @param userId User ID of user claiming the bounty
 * @returns Updated Bounty
 */
export async function claimBounty(bountyId: string, userId: string): Promise<Bounty> {
  try {
    console.log("Claiming bounty with id:", bountyId, "for user:", userId)
    const bounty: Bounty = await db.bounty.update({
      where: {
        id: bountyId,
      },
      data: {
        claimerId: userId,
      },
    })

    revalidatePath(`/`, "page")
    revalidatePath(`/bounty/${bounty.id}`, "page")
    revalidatePath(`/profile`, "page")

    return bounty
  } catch (error) {
    console.error("Failed to claim bounty:", error)
    throw new Error("Failed to claim bounty")
  }
}
