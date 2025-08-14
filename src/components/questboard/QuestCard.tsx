"use client"

import { Badge } from "@/components/ui/badge"
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
import { QuestStatus, type Quest, type User } from "@prisma/client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"

export default function QuestCard({ quest, user }: { quest: Quest; user: User }) {
  const [deadline, setDeadline] = useState("")

  useEffect(() => {
    setDeadline(quest.deadline?.toLocaleString() ?? "N/A")
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{formatBountyItem(quest.item)}</CardTitle>
        <CardDescription>
          <p className="font-mono font-semibold">
            {/*<span className={`${quest.status === QuestStatus.COMPLETED ? "text-green-600" : ""}`}>*/}
            <Badge variant="secondary">
              {formatBountyStatus(quest.status).toLocaleUpperCase()}
            </Badge>
            {/*</span>*/}
          </p>
          <p>{quest.reward && `Reward: ₹${quest.reward}`}</p>
        </CardDescription>
        <CardAction>
          <Link href={`/bounty/${quest.id}`}>
            <Button variant="secondary">Details</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {quest.details && <p className="text-sm">{quest.details}</p>}
          {quest.destination && (
            <p className="text-sm">
              <span className="font-semibold">Delivery Location:</span> {quest.destination}
            </p>
          )}
          {quest.deadline && (
            <p className="text-sm">
              <span className="font-semibold">Deadline:</span> {deadline}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/*<p className="text-muted-foreground text-sm">Posted {quest.createdAt.toLocaleString()}</p>*/}
        {quest.status === QuestStatus.POSTED && quest.posterId !== user.id && (
          <Button>Claim Bounty</Button>
        )}
      </CardFooter>
    </Card>
  )
}
