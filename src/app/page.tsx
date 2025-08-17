import { getAllBountiesWithPartialPoster } from "@/actions/bounty"
import { getUserById } from "@/actions/user"
import AddNewBountyForm from "@/components/bountyboard/AddNewBountyForm"
import BountiesList from "@/components/bountyboard/BountiesList"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Skeleton } from "@/components/ui/skeleton"
import type { BountyWithPartialPoster } from "@/lib/types"
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

  const allBounties: Array<BountyWithPartialPoster> | null = await getAllBountiesWithPartialPoster()

  return (
    <main className="">
      <div className="prose dark:prose-invert prose-h1:mb-0 prose-p:my-2">
        <div className="flex w-full flex-row items-center justify-between">
          <h1>Bounty Board</h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="icon" variant="default" className="text-accent size-10">
                <PlusIcon className="size-8" />
                <span className="sr-only">Offer a Bounty</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Offer a Bounty</DrawerTitle>
                <DrawerDescription>Add a new Bounty to the public board.</DrawerDescription>
              </DrawerHeader>

              <div className="w-full">
                <div className="mx-auto mt-8 max-w-3xl px-8">
                  <AddNewBountyForm userId={user.id} />
                </div>
              </div>
              <DrawerFooter>
                <p className="text-muted-foreground mb-4 text-center text-xs">
                  Remember: We do NOT guarantee any deadlines or rewards. Both are the sole
                  responsibilities of the claimer and poster respectively.
                </p>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <p className="text-muted-foreground">Currently active bounties</p>
        <Suspense fallback={<BountiesLoading />}>
          <BountiesList user={user} allBounties={allBounties} />
        </Suspense>
      </div>
    </main>
  )
}
