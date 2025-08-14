import { getUserById } from "@/actions/user"
import AddNewBountyForm from "@/components/bountyboard/AddNewBountyForm"
import BountiesList from "@/components/bountyboard/BountiesList"
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

function BountiesLoading() {
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
          <h1>Bounty Board</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="default" className="text-accent size-10">
                <PlusIcon className="size-8" />
                <span className="sr-only">Offer a Bounty</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Offer a Bounty</DialogTitle>
                <DialogDescription>Add a new Bounty to the public board.</DialogDescription>
              </DialogHeader>
              <AddNewBountyForm userId={user.id} />
              <DialogFooter>
                <p className="text-muted-foreground text-xs">
                  Remember: We do NOT guarantee any deadlines or rewards. Both are the sole
                  responsibilities of the claimer and poster respectively.
                </p>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-muted-foreground">Currently active bounties</p>
        <Suspense fallback={<BountiesLoading />}>
          <BountiesList />
        </Suspense>
      </div>
    </main>
  )
}
