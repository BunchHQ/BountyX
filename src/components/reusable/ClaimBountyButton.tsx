"use client"

import { BountyStatus, type Bounty } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Loader2Icon } from "lucide-react"
import { useTransition } from "react"
import { claimBounty } from "@/actions/bounty"
import { toast } from "sonner"
import type { ClassNameValue } from "tailwind-merge"

interface Props {
  bounty: Bounty | null
  onClick?: (bounty: Bounty) => void
  userId: string
  className?: string
}
export default function ClaimBountyButton({ bounty, onClick, userId, className }: Props) {
  const [isPending, startTransition] = useTransition()

  function handleClaimBounty(bounty: Bounty) {
    startTransition(async () => {
      const { bounty: updatedBounty, message } = await claimBounty(bounty.id, userId)

      if (updatedBounty && updatedBounty.claimedAt !== null && updatedBounty.claimerId === userId) {
        toast.success(message)
      } else {
        toast.error(message)
      }
    })

    onClick?.(bounty)
  }

  if (!bounty) {
    return <></>
  }

  if (bounty.status === BountyStatus.CLAIMED && bounty.claimerId === userId) {
    return (
      <Button className={className} disabled>
        You Claimed
      </Button>
    )
  }

  if (bounty.status === BountyStatus.CLAIMED && bounty.posterId === userId) {
    return (
      <Button className={className} disabled>
        Claimed by Someone
      </Button>
    )
  }

  if (bounty.status === BountyStatus.CLAIMED) {
    return (
      <Button className={className} disabled>
        Already Claimed
      </Button>
    )
  }

  if (bounty.status === BountyStatus.COMPLETED || bounty.status === BountyStatus.CANCELLED) {
    return (
      <Button className={className} disabled>
        Bounty Closed
      </Button>
    )
  }

  if (bounty.status === BountyStatus.OFFERED && bounty.posterId === userId) {
    return (
      <Button className={className} disabled>
        You Posted
      </Button>
    )
  }

  if (bounty.status === BountyStatus.OFFERED && bounty.posterId !== userId) {
    return (
      <Button className={className} onClick={() => handleClaimBounty(bounty)} disabled={isPending}>
        {isPending ? <Loader2Icon className="animate-spin" /> : "Claim Bounty"}
      </Button>
    )
  }
}
