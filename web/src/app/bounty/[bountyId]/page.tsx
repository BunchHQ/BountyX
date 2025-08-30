import { getBountyByIdWithPosterAndClaimer } from "@/actions/bounty"
import CancelBountyButton from "@/components/reusable/CancelBountyButton"
import ClaimBountyButton from "@/components/reusable/ClaimBountyButton"
import { Badge } from "@/components/ui/badge"
import type { BountyWithPosterAndClaimer } from "@/lib/types"
import {
  formatBountyItem,
  formatBountyStatus,
  formatDateTime,
  formatDeadline,
  toDateTime,
} from "@/lib/utils"
import getUser from "@/utils/supabase/server"

interface Props {
  params: Promise<{ bountyId: string }>
}

export default async function BountyPage({ params }: Props) {
  const user = await getUser()

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-destructive text-2xl font-bold">Please Login to view this page.</h1>
      </div>
    )
  }

  const { bountyId } = await params
  const bounty: BountyWithPosterAndClaimer | null =
    await getBountyByIdWithPosterAndClaimer(bountyId)

  if (!bounty) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-destructive text-2xl font-bold">Bounty not found</h1>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{formatBountyItem(bounty.item)}</h1>
        <span className="rounded-full px-3 py-1 text-sm">
          <Badge>{formatBountyStatus(bounty.status).toLocaleUpperCase()}</Badge>
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="mb-2 text-lg font-semibold">Offered by</h2>
          <p className="text-muted-foreground">{bounty.poster.name}</p>
        </div>
        {bounty.claimer && (
          <div>
            <h2 className="mb-2 text-lg font-semibold">Claimed by</h2>
            <p className="text-muted-foreground">
              {bounty.claimer.name} {bounty.claimer.id === user.id ? " (You)" : ""}
            </p>
          </div>
        )}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Details</h2>
          <p className="text-muted-foreground">{bounty.details || "No details provided"}</p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold">Reward</h2>
          <p className="text-muted-foreground">
            {bounty.reward ? `$${bounty.reward}` : "No reward specified"}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold">Destination</h2>
          <p className="text-muted-foreground">
            {bounty.destination || "No destination specified"}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold">Deadline</h2>
          <p className="text-muted-foreground">
            {bounty.deadline === null && "No Deadline"}
            {bounty.deadline &&
              `${formatDateTime(toDateTime(bounty.createdAt).plus({ seconds: bounty.deadline }))} (${formatDeadline(bounty.deadline)})`}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold">Offered At</h2>
          <p className="text-muted-foreground">{formatDateTime(bounty.createdAt)}</p>
        </div>

        <div className="mt-8 space-y-2">
          <ClaimBountyButton className="w-full" bounty={bounty} userId={user.id} />
          <CancelBountyButton className="w-full" bounty={bounty} userId={user.id} />
        </div>

        {/*<div className="text-muted-foreground space-y-2 text-sm">
          <p>Created: {bounty.createdAt.toLocaleDateString()}</p>
          <p>Last updated: {bounty.updatedAt.toLocaleDateString()}</p>
        </div>*/}
      </div>
    </div>
  )
}
