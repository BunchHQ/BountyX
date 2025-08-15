"use client"

import { claimBounty } from "@/actions/bounty"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatBountyItem, formatBountyStatus } from "@/lib/utils"
import { type Bounty, type User } from "@prisma/client"
import Link from "next/link"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import ClaimBountyButton from "../reusable/ClaimBountyButton"

export default function BountyCard({ bounty, user }: { bounty: Bounty; user: User }) {
  const [deadline, setDeadline] = useState("")
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setDeadline(bounty.deadline?.toLocaleString() ?? "N/A")
  })

  function handleClaimBounty(bounty: Bounty) {
    startTransition(async () => {
      const { bounty: updatedBounty, message } = await claimBounty(bounty.id, user.id)

      if (
        updatedBounty &&
        updatedBounty.claimedAt !== null &&
        updatedBounty.claimerId === user.id
      ) {
        toast.success(message)
      } else {
        toast.error(message)
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{formatBountyItem(bounty.item)}</CardTitle>
        <CardDescription>
          <p className="font-mono font-semibold">
            {/*<span className={`${bounty.status === BountyStatus.COMPLETED ? "text-green-600" : ""}`}>*/}
            <Badge variant="secondary">
              {formatBountyStatus(bounty.status).toLocaleUpperCase()}
            </Badge>
            {/*</span>*/}
          </p>
          <p>{bounty.reward !== null && `Reward: ₹${bounty.reward}`}</p>
        </CardDescription>
        <CardAction>
          <Link href={`/bounty/${bounty.id}`}>
            <Button variant="secondary">Details</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {bounty.details && <p className="text-sm">{bounty.details}</p>}
          {bounty.destination && (
            <p className="text-sm">
              <span className="font-semibold">Delivery Location:</span> {bounty.destination}
            </p>
          )}
          {bounty.deadline && (
            <p className="text-sm">
              <span className="font-semibold">Deadline:</span> {deadline}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/*<p className="text-muted-foreground text-sm">Posted {bounty.createdAt.toLocaleString()}</p>*/}
        <ClaimBountyButton
          bounty={bounty}
          onClick={handleClaimBounty}
          userId={user.id}
          isPending={isPending}
        />
      </CardFooter>
    </Card>
  )
}
