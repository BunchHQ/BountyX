import type { Quest, User } from "@prisma/client"

export type QuestCreateType = Omit<Quest, "id" | "createdAt" | "updatedAt" | "claimerId">
export type QuestWithPoster = Quest & { poster: User }
export type QuestWithClaimer = QuestWithPoster & { claimer: User | null }
export type QuestWithPosterAndClaimer = QuestWithPoster & QuestWithClaimer
