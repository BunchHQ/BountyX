"use client"

import { bountyStatusesReverse, ITEM_TYPE_ALL, itemTypesReverse, STATUS_ALL } from "@/lib/data"
import type { BountyWithPartialPoster } from "@/lib/types"
import { type User } from "@prisma/client"
import { useMemo, useState } from "react"
import BountyCard from "./BountyCard"
import BountyListFilters from "./BountyListFilters"

interface Props {
  user: User
  allBounties: Array<BountyWithPartialPoster> | null
}

export default function BountiesList({ user, allBounties }: Props) {
  if (allBounties === null) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <p className="text-center">
          Unable to retrieve bounties right now. Please try again after sometime.
        </p>
      </div>
    )
  }

  if (allBounties.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <p className="text-center">No bounties found.</p>
      </div>
    )
  }

  const [selectedItemType, setSelectedItemType] = useState<string>(ITEM_TYPE_ALL)
  const [selectedStatus, setSelectedStatus] = useState<string>(STATUS_ALL)

  const filteredBounties = useMemo(() => {
    if (selectedItemType === ITEM_TYPE_ALL && selectedStatus === STATUS_ALL) {
      return allBounties
    }

    return allBounties.filter(b => {
      const itemTypeMatches =
        selectedItemType === ITEM_TYPE_ALL ? true : b.item === itemTypesReverse[selectedItemType]
      const statusMatches =
        selectedStatus === STATUS_ALL ? true : b.status === bountyStatusesReverse[selectedStatus]

      return itemTypeMatches && statusMatches
    })
  }, [allBounties, selectedItemType, selectedStatus])

  function handleItemTypeChange(item: string) {
    setSelectedItemType(item)
  }

  function handleStatusChange(status: string) {
    setSelectedStatus(status)
  }

  return (
    <>
      <BountyListFilters
        selectedItem={selectedItemType}
        onItemTypeChange={handleItemTypeChange}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
      />
      <div className="my-4 grid grid-cols-1 gap-4">
        {filteredBounties.length === 0 && (
          <p className="text-center">No bounties found. Check the filters.</p>
        )}

        {filteredBounties.map(bounty => (
          <BountyCard bounty={bounty} key={bounty.id} user={user} />
        ))}
      </div>
    </>
  )
}
