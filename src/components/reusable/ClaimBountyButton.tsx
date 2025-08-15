"use client"

import { BountyStatus, type Bounty } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Loader2Icon } from "lucide-react"

interface Props {
  bounty: Bounty | null
  onClick: (bounty: Bounty) => void
  isPending: boolean
  userId: string
}
export default function ClaimBountyButton({ bounty, onClick, isPending, userId }: Props) {
  if (!bounty) {
    return <></>
  }

  if (bounty.status === BountyStatus.CLAIMED && bounty.claimerId === userId) {
    return <Button disabled>You Claimed</Button>
  }

  if (bounty.status === BountyStatus.CLAIMED) {
    return <Button disabled>Already Claimed</Button>
  }

  if (bounty.status === BountyStatus.COMPLETED || bounty.status === BountyStatus.CANCELLED) {
    return <Button disabled>Bounty Closed</Button>
  }

  if (bounty.status === BountyStatus.OFFERED && bounty.posterId === userId) {
    return <Button disabled>You Posted</Button>
  }

  if (bounty.status === BountyStatus.OFFERED && bounty.posterId !== userId) {
    return (
      <Button onClick={() => onClick(bounty)} disabled={isPending}>
        {isPending ? <Loader2Icon className="animate-spin" /> : "Claim Bounty"}
      </Button>
    )
  }
}
