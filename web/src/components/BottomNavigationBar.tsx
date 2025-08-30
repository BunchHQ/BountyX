"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export interface BottomNavigationBarOptions {
  /// Label of the link
  label: string
  /// URL of the link
  value: string
  /// Icon for the link
  icon: React.ReactNode
}

interface BottomNavigationBarProps {
  className?: string
  options: Array<BottomNavigationBarOptions>
  defaultOption?: string
}

export default function BottomNavigationBar({
  className,
  options,
  defaultOption,
}: BottomNavigationBarProps) {
  const [selected, setSelected] = useState(defaultOption || options.at(0)?.value)

  return (
    <div className="bg-card sticky bottom-0">
      <div className="grid w-full grid-cols-3 place-items-center content-center py-1">
        {options.map(option => (
          <Button
            key={option.value}
            asChild
            variant="link"
            size="lg"
            onClick={() => setSelected(option.value)}
          >
            <Link
              href={option.value}
              className={`flex h-auto w-min flex-col items-center justify-center px-2 py-2`}
            >
              <span
                className={`${selected === option.value && "text-primary scale-135 transition-transform"}`}
              >
                {option.icon}
              </span>
              <span
                className={`${selected === option.value ? "text-primary font-bold underline" : ""}`}
              >
                {option.label}
              </span>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
