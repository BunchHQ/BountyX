import { QuestStatus, type Quest } from "@prisma/client"
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

export default function QuestCard({ quest }: { quest: Quest }) {
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
              <span className="font-semibold">Deadline:</span> {quest.deadline.toLocaleDateString()}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-muted-foreground text-sm">
          Posted {quest.createdAt.toLocaleDateString()}
        </p>
        {quest.status === "POSTED" && <Button>Accept Quest</Button>}
      </CardFooter>
    </Card>
  )
}
