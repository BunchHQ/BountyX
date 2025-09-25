"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DownloadIcon, Loader2Icon } from "lucide-react"

export default function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [isInstallable, setIsInstallable] = useState<boolean | null>(null)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      ;(deferredPrompt as any).prompt()
      const { outcome } = await (deferredPrompt as any).userChoice
      setDeferredPrompt(null)
      setIsInstallable(false)
      console.log(`User response to the install prompt: ${outcome}`)
    }
  }

  const buttonContents = () => {
    if (isInstallable === true) {
      return (
        <>
          <DownloadIcon size={58} />
          Install Now
        </>
      )
    } else if (isInstallable === false) {
      return <>BountyX is not available for your browser.</>
    } else {
      return (
        <>
          <Loader2Icon className="animate-spin" />
          Checking browser support
        </>
      )
    }
  }

  return (
    <>
      <Button onClick={handleInstallClick} disabled={isInstallable !== true}>
        {buttonContents()}
      </Button>
    </>
  )
}
