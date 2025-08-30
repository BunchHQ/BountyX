"use client"

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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { BountyWithPartialPoster } from "@/lib/types"
import {
  formatBountyItem,
  formatBountyStatus,
  formatDateTime,
  formatDateTimeToRelative,
  formatDeadline,
  formatDeadlineToRelative,
  toDateTime,
} from "@/lib/utils"
import { type User } from "@prisma/client"
import { InfoIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import ClaimBountyButton from "../reusable/ClaimBountyButton"

export default function BountyCard({
  bounty,
  user,
}: {
  bounty: BountyWithPartialPoster
  user: User
}) {
  const [createdAt, setCreatedAt] = useState("")
  const [deadline, setDeadline] = useState("")

  const [createdAtFull, setCreatedAtFull] = useState("")
  const [deadlineFull, setDeadlineFull] = useState("")

  useEffect(() => {
    setCreatedAt(formatDateTimeToRelative(bounty.createdAt))
    setDeadline(
      bounty.deadline !== null
        ? `${formatDeadlineToRelative(bounty.createdAt, bounty.deadline)} (${formatDeadline(bounty.deadline)})`
        : "N/A",
    )

    setCreatedAtFull(formatDateTime(bounty.createdAt))
    setDeadlineFull(
      bounty.deadline !== null
        ? `${formatDateTime(toDateTime(bounty.createdAt).plus({ seconds: bounty.deadline }))}`
        : "",
    )
  }, [bounty])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{formatBountyItem(bounty.item)}</CardTitle>
        <CardDescription>
          <p className="font-mono font-semibold">
            {/*<span className={`${bounty.status === BountyStatus.COMPLETED ? "text-green-600" : ""}`}>*/}
            <Badge variant="secondary" className="font-medium">
              {formatBountyStatus(bounty.status).toLocaleUpperCase()}
            </Badge>
            {/*</span>*/}
          </p>
          <p>
            Offered By: <span className="font-semibold">{bounty.poster.name}</span>
          </p>
          <p>
            {bounty.reward !== null && (
              <span>
                Reward: <span className="font-bold">₹{bounty.reward}</span>
              </span>
            )}
          </p>
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
          {
            <p className="text-sm">
              <span className="font-semibold">Posted: </span>
              <time dateTime={toDateTime(bounty.createdAt).toISO()}>{createdAt}</time>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="ml-2 inline size-4" />
                </TooltipTrigger>
                <TooltipContent>{createdAtFull}</TooltipContent>
              </Tooltip>
            </p>
          }
          {bounty.deadline && (
            <p className="text-sm">
              <span className="font-semibold">Deadline: </span>
              <time
                dateTime={toDateTime(bounty.createdAt).plus({ seconds: bounty.deadline }).toISO()}
              >
                {deadline}
              </time>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="ml-2 inline size-4" />
                </TooltipTrigger>
                <TooltipContent>{deadlineFull}</TooltipContent>
              </Tooltip>
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/*<p className="text-muted-foreground text-sm">Posted {bounty.createdAt.toLocaleString()}</p>*/}
        <ClaimBountyButton bounty={bounty} userId={user.id} />
      </CardFooter>
    </Card>
  )
}
