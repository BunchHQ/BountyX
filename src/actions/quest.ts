"use server"

import type { QuestCreateType } from "@/lib/types"
import { db } from "@/server/db"
import type { Quest } from "@prisma/client"
import { revalidatePath } from "next/cache"

/**
 * Creates a new quest
 */
export async function createQuest(bountyData: QuestCreateType): Promise<Quest> {
  try {
    console.log("Creating bounty with data:", bountyData)
    const bounty: Quest = await db.quest.create({
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
 * @param id Quest ID
 * @returns The Quest object
 */
export async function getQuestById(id: string): Promise<Quest | null> {
  try {
    const quest = await db.quest.findUnique({
      where: {
        id,
      },
    })

    return quest
  } catch (error) {
    console.error("Failed to get bounty by id:", error)
    throw new Error("Failed to get bounty by id")
  }
}

/**
 *
 * @returns Array of all quests
 */
export async function getAllQuests(): Promise<Quest[]> {
  try {
    const quests = await db.quest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return quests
  } catch (error) {
    console.error("Failed to get all bounties:", error)
    throw new Error("Failed to get all bounties")
  }
}

/**
 *
 * @param questId The Quest ID to update
 * @param questData Quest data to update
 * @returns Updated Quest
 */
export async function updateQuest(
  questId: string,
  questData: Partial<QuestCreateType>,
): Promise<Quest> {
  try {
    console.log("Updating bounty with id:", questId, "and data:", questData)
    const quest: Quest = await db.quest.update({
      where: {
        id: questId,
      },
      data: questData,
    })

    revalidatePath(`/`, "page")
    revalidatePath(`/bounty/${quest.id}`, "page")
    revalidatePath(`/profile`, "page")

    return quest
  } catch (error) {
    console.error("Failed to update bounty:", error)
    throw new Error("Failed to update bounty")
  }
}

/**
 *
 * @param questId The Quest ID to claim
 * @param userId User ID of user claiming the quest
 * @returns Updated Quest
 */
export async function claimQuest(questId: string, userId: string): Promise<Quest> {
  try {
    console.log("Claiming bounty with id:", questId, "for user:", userId)
    const quest: Quest = await db.quest.update({
      where: {
        id: questId,
      },
      data: {
        claimerId: userId,
      },
    })

    revalidatePath(`/`, "page")
    revalidatePath(`/bounty/${quest.id}`, "page")
    revalidatePath(`/profile`, "page")

    return quest
  } catch (error) {
    console.error("Failed to claim bounty:", error)
    throw new Error("Failed to claim bounty")
  }
}
