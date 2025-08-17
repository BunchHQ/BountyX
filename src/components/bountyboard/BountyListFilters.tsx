"use client"

import { Badge } from "@/components/ui/badge"
import { bountyStatuses, ITEM_TYPE_ALL, itemTypes, STATUS_ALL } from "@/lib/data"

interface Props {
  selectedItem: string
  onItemTypeChange: (item: string) => void
  selectedStatus: string
  onStatusChange: (status: string) => void
}

export default function BountyListFilters({
  selectedItem,
  onItemTypeChange,
  selectedStatus,
  onStatusChange,
}: Props) {
  const items = Object.values(itemTypes)
  const statuses = Object.values(bountyStatuses)

  function toggleItemType(item: string) {
    if (selectedItem === item) {
      onItemTypeChange(ITEM_TYPE_ALL)
    } else {
      onItemTypeChange(item)
    }
  }

  function toggleStatus(status: string) {
    if (selectedStatus === status) {
      onStatusChange(STATUS_ALL)
    } else {
      onStatusChange(status)
    }
  }

  return (
    <div>
      {/* Item Type Filter */}
      <div className="no-scrollbar my-4 flex max-w-full flex-row gap-2 overflow-scroll">
        <Badge
          key={ITEM_TYPE_ALL}
          variant={selectedItem === ITEM_TYPE_ALL ? "secondary" : "outline"}
          onClick={() => toggleItemType(ITEM_TYPE_ALL)}
          className="cursor-pointer"
        >
          {ITEM_TYPE_ALL}
        </Badge>

        {items.map((item, index) => (
          <Badge
            key={index}
            variant={selectedItem === item ? "secondary" : "outline"}
            onClick={() => toggleItemType(item)}
            className="cursor-pointer"
          >
            {item}
          </Badge>
        ))}
      </div>

      {/* Item Status Filter */}
      <div className="no-scrollbar my-4 flex max-w-full flex-row gap-2 overflow-scroll">
        <Badge
          key={STATUS_ALL}
          variant={selectedStatus === STATUS_ALL ? "secondary" : "outline"}
          onClick={() => toggleStatus(STATUS_ALL)}
          className="cursor-pointer"
        >
          {STATUS_ALL}
        </Badge>

        {statuses.map((status, index) => (
          <Badge
            key={index}
            variant={selectedStatus === status ? "secondary" : "outline"}
            onClick={() => toggleStatus(status)}
            className="cursor-pointer"
          >
            {status}
          </Badge>
        ))}
      </div>
    </div>
  )
}
