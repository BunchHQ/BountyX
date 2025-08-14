import { getQuestById } from "@/actions/quest"
import type { Quest } from "@prisma/client"
import { formatBountyItem, formatBountyStatus } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface Props {
  params: Promise<{ bountyId: string }>
}

export default async function QuestPage({ params }: Props) {
  const { bountyId } = await params
  const quest: Quest | null = await getQuestById(bountyId)

  if (!quest) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-destructive text-2xl font-bold">Bounty not found</h1>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{formatBountyItem(quest.item)}</h1>
        <span className="rounded-full px-3 py-1 text-sm">
          <Badge>{formatBountyStatus(quest.status).toLocaleUpperCase()}</Badge>
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="mb-2 text-lg font-semibold">Details</h2>
          <p className="text-muted-foreground">{quest.details || "No details provided"}</p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold">Reward</h2>
          <p className="text-muted-foreground">
            {quest.reward ? `$${quest.reward}` : "No reward specified"}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold">Destination</h2>
          <p className="text-muted-foreground">{quest.destination || "No destination specified"}</p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold">Deadline</h2>
          {/*<p className="text-muted-foreground">{deadline}</p>*/}
        </div>

        {/*<div className="text-muted-foreground space-y-2 text-sm">
          <p>Created: {quest.createdAt.toLocaleDateString()}</p>
          <p>Last updated: {quest.updatedAt.toLocaleDateString()}</p>
        </div>*/}
      </div>
    </div>
  )
}
