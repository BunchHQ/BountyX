"use client"

import { BountyStatus, type Bounty } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Loader2Icon } from "lucide-react"
import { useState, useTransition } from "react"
import { cancelBountyById } from "@/actions/bounty"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Props {
  bounty: Bounty | null
  onClick?: (bounty: Bounty) => void
  userId: string
  className?: string
}

export default function CancelBountyButton({ bounty, onClick, userId, className }: Props) {
  const [isPending, startTransition] = useTransition()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  function handleCancelBounty(bounty: Bounty) {
    if (bounty.posterId !== userId) {
      console.error("Unauthorized")
      toast.error("Cannot withdraw bounty.")
      return
    }

    if (bounty.status === BountyStatus.CANCELLED || bounty.status === BountyStatus.COMPLETED) {
      console.error("Not cancelling already closed bounty")
      return
    }

    if (bounty.status === BountyStatus.CLAIMED && isDialogOpen === false) {
      console.info("Asking for confirmation to cancel a claimed bounty.")
      setIsDialogOpen(true)
      return
    }

    startTransition(async () => {
      const { bounty: updatedBounty, message } = await cancelBountyById(bounty.id)

      if (updatedBounty && updatedBounty.status === BountyStatus.CANCELLED) {
        toast.success(message)
      } else {
        toast.error(message)
      }
    })

    setIsDialogOpen(false)
    onClick?.(bounty)
  }

  if (!bounty) {
    return null
  }

  if (bounty.posterId !== userId) {
    return null
  }

  if (bounty.status === BountyStatus.COMPLETED) {
    return (
      <Button className={className} disabled variant="secondary">
        Bounty Completed
      </Button>
    )
  }

  if (bounty.status === BountyStatus.CANCELLED) {
    return (
      <Button className={className} disabled variant="secondary">
        Bounty Cancelled
      </Button>
    )
  }

  if (bounty.status === BountyStatus.OFFERED || bounty.status === BountyStatus.CLAIMED) {
    return (
      <>
        <Button
          className={className}
          onClick={() => handleCancelBounty(bounty)}
          disabled={isPending}
          variant="destructive"
        >
          {isPending ? <Loader2Icon className="animate-spin" /> : "Withdraw Bounty"}
        </Button>

        <AlertDialog open={isDialogOpen} onOpenChange={open => setIsDialogOpen(open)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Really widthdraw this bounty?</AlertDialogTitle>
              <AlertDialogDescription>
                Someone has already <b>claimed</b> this bounty. Are you sure you want to withdraw
                it?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  className="text-white"
                  onClick={() => handleCancelBounty(bounty)}
                  disabled={isPending}
                  variant="destructive"
                >
                  {isPending ? <Loader2Icon className="animate-spin" /> : "Withdraw"}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }

  return null
}
