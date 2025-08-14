import { type Quest } from "@prisma/client"
import QuestCard from "./QuestCard"
import { getAllQuests } from "@/actions/quest"
import getUser from "@/utils/supabase/server"
import { getUserById } from "@/actions/user"

export default async function QuestsList() {
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

  const allQuests: Array<Quest> = await getAllQuests()

  if (allQuests.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <p>No bounties found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {allQuests.map(quest => (
        <QuestCard quest={quest} key={quest.id} user={user} />
      ))}
    </div>
  )
}
