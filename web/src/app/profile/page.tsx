import { getClaimedBountyCountByUserId, getPostedBountyCountByUserId } from "@/actions/bounty"
import { getUserById } from "@/actions/user"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import getUser from "@/utils/supabase/server"
import type { User } from "@prisma/client"

export default async function ProfilePage() {
  const authUser = await getUser()

  if (!authUser) {
    return <div>User not found</div>
  }

  const user: User = (await getUserById(authUser.id))!

  const postedCount = await getPostedBountyCountByUserId(user.id)
  const claimedCount = await getClaimedBountyCountByUserId(user.id)

  return (
    <div className="">
      <div className="prose dark:prose-invert prose-p:my-2 prose-h2:my-0 mb-8">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>
      <div className="grid max-w-4xl grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{postedCount}</CardTitle>
          </CardHeader>
          <CardFooter className="px-4 text-sm">Offered Bounties</CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{claimedCount}</CardTitle>
          </CardHeader>
          <CardFooter className="px-4 text-sm">Claimed Bounties</CardFooter>
        </Card>
      </div>
    </div>
  )
}
