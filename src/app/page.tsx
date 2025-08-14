import { getUserById } from "@/actions/user"
import AddNewQuestForm from "@/components/questboard/AddNewQuestForm"
import QuestsList from "@/components/questboard/QuestsList"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import getUser from "@/utils/supabase/server"
import type { User } from "@prisma/client"
import { PlusIcon } from "lucide-react"
import { redirect } from "next/navigation"
import { Suspense } from "react"

function QuestsLoading() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

export default async function HomePage() {
  const authUser = await getUser()

  if (!authUser) {
    redirect("/login")
  }

  const user: User | null = await getUserById(authUser.id)

  if (!user) {
    return <div>Error: User not Found</div>
  }

  return (
    <main className="">
      <div className="prose dark:prose-invert prose-h1:mb-0">
        <div className="flex w-full flex-row items-center justify-between">
          <h1>Questboard</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="default" className="text-accent size-10">
                <PlusIcon className="size-8" />
                <span className="sr-only">Add new Quest</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new Quest</DialogTitle>
                <DialogDescription>Add a new Quest to the public board.</DialogDescription>
              </DialogHeader>
              <AddNewQuestForm userId={user.id} />
              <DialogFooter>
                <p className="text-muted-foreground text-xs">
                  Remember: We do NOT guarantee any deadlines or rewards. Both are the sole
                  responsibility of the claimer and poster respectively.
                </p>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-muted-foreground">Currently active quests</p>
        <Suspense fallback={<QuestsLoading />}>
          <QuestsList />
        </Suspense>
      </div>
    </main>
  )
}
