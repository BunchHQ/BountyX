"use server"

import type { QuestCreateType } from "@/lib/types"
import { db } from "@/server/db"
import type { Quest } from "@prisma/client"
import { revalidatePath } from "next/cache"

/**
 * Creates a new quest
 */
export async function createQuest(questData: QuestCreateType): Promise<Quest> {
  try {
    console.log("Creating quest with data:", questData)
    const quest: Quest = await db.quest.create({
      data: questData,
    })

    revalidatePath(`/`, "page")
    revalidatePath(`/quests/${quest.id}`, "page")
    revalidatePath(`/profile`, "page")

    return quest
  } catch (error) {
    console.error("Failed to create quest:", error)
    throw new Error("Failed to create quest")
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
    console.error("Failed to get all quests:", error)
    throw new Error("Failed to get all quests")
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
    console.log("Updating quest with id:", questId, "and data:", questData)
    const quest: Quest = await db.quest.update({
      where: {
        id: questId,
      },
      data: questData,
    })

    revalidatePath(`/`, "page")
    revalidatePath(`/quests/${quest.id}`, "page")
    revalidatePath(`/profile`, "page")

    return quest
  } catch (error) {
    console.error("Failed to update quest:", error)
    throw new Error("Failed to update quest")
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
    console.log("Claiming quest with id:", questId, "for user:", userId)
    const quest: Quest = await db.quest.update({
      where: {
        id: questId,
      },
      data: {
        claimerId: userId,
      },
    })

    revalidatePath(`/`, "page")
    revalidatePath(`/quests/${quest.id}`, "page")
    revalidatePath(`/profile`, "page")

    return quest
  } catch (error) {
    console.error("Failed to claim quest:", error)
    throw new Error("Failed to claim quest")
  }
}
