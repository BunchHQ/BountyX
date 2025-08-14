"use client"

import { QuestStatus, type Quest, type User } from "@prisma/client"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"

export default function QuestCard({ quest, user }: { quest: Quest; user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{quest.item}</CardTitle>
        <CardDescription>
          <p>
            Status:{" "}
            <span className={`${quest.status === QuestStatus.COMPLETED ? "text-green-600" : ""}`}>
              {quest.status}
            </span>
          </p>
          <p>{quest.reward && ` • Reward: ₹${quest.reward}`}</p>
        </CardDescription>
        <CardAction>
          <Button variant="secondary">Details</Button>
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
              <span className="font-semibold">Deadline:</span> {quest.deadline.toLocaleString()}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-muted-foreground text-sm">Posted {quest.createdAt.toLocaleString()}</p>
        {quest.status === "POSTED" && quest.posterId !== user.id && <Button>Accept Quest</Button>}
      </CardFooter>
    </Card>
  )
}
