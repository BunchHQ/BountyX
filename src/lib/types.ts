import type { Bounty, User } from "@prisma/client"

export type BountyCreateType = Omit<
  Bounty,
  "id" | "createdAt" | "updatedAt" | "claimerId" | "claimedAt"
>
export type BountyWithPoster = Bounty & { poster: User }
export type BountyWithPartialPoster = Bounty & { poster: Partial<User> }
export type BountyWithClaimer = BountyWithPoster & { claimer: User | null }
export type BountyWithPosterAndClaimer = BountyWithPoster & BountyWithClaimer

export type BountyWithMessage = { bounty: Bounty | null; message: string }

export type UserWithPostedBounties = User & { postedBounties: Bounty[] }
export type UserWithClaimedBounties = User & { claimedBounties: Bounty[] }
export type UserWithBounties = UserWithPostedBounties & UserWithClaimedBounties
