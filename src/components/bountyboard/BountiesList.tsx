import { type Bounty } from "@prisma/client"
import BountyCard from "./BountyCard"
import { getAllBounties } from "@/actions/bounty"
import getUser from "@/utils/supabase/server"
import { getUserById } from "@/actions/user"

export default async function BountiesList() {
  const authUser = await getUser()

  if (!authUser) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <p>Login to view bounties.</p>
      </div>
    )
  }

  const user = await getUserById(authUser.id)

  if (!user) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <p>User not found.</p>
      </div>
    )
  }

  const allBounties: Array<Bounty> = await getAllBounties()

  if (allBounties.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <p>No bounties found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {allBounties.map(bounty => (
        <BountyCard bounty={bounty} key={bounty.id} user={user} />
      ))}
    </div>
  )
}
