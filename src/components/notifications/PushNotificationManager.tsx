"use client"

import { sendNotification, subscribeUser, unsubscribeUser } from "@/actions/notification"
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
import { Button } from "@/components/ui/button"
import { env } from "@/env"
import { urlBase64ToUint8Array } from "@/lib/utils"
import type { AuthUser } from "@supabase/supabase-js"
import { BellIcon, BellOffIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function PushNotificationManager({ user }: { user: AuthUser }) {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  let notificationPopup: NodeJS.Timeout | null = null

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true)
      registerServiceWorker()
    } else {
      console.error("Push notifications are not supported in this browser.")
    }
  }, [])

  useEffect(() => {
    if (subscription === null) {
      notificationPopup = setTimeout(() => setDialogOpen(true), 5000)
    }

    return () => {
      if (notificationPopup) {
        clearTimeout(notificationPopup)
      }
    }
  }, [subscription])

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    })
    const sub = await registration.pushManager.getSubscription()
    setSubscription(sub)
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    try {
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),
      })

      setSubscription(sub)
      const serializedSub = JSON.parse(JSON.stringify(sub))
      console.log("Subscribing", serializedSub, user.id)

      await subscribeUser(serializedSub, user.id)
    } catch (error) {
      console.error("Error subscribing to push notifications:", error)
    }
  }

  async function unsubscribeFromPush() {
    const endpoint = subscription?.endpoint ?? ""
    await subscription?.unsubscribe()
    console.log("Unsubscribing", endpoint)
    await unsubscribeUser(endpoint, user.id)
    setSubscription(null)
  }

  if (!isSupported) {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <BellOffIcon />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Push Notification</AlertDialogTitle>
            <AlertDialogDescription>
              We are sorry! Push notifications are not supported on your device. Please use the
              latest version of your browser or device. You are missing out on latest bounty
              updates.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger>
        <BellIcon />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Push Notification</AlertDialogTitle>
          <AlertDialogDescription>
            {subscription
              ? "You are subscribed to push notifications. You will receive notifications about new bounties and updates."
              : "You are not subscribed to push notifications. Subscribe to receive notifications about new bounties and updates."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            {subscription ? (
              <Button onClick={unsubscribeFromPush} variant="destructive" className="text-white">
                Unsubscribe
              </Button>
            ) : (
              <Button onClick={subscribeToPush}>Subscribe</Button>
            )}
          </AlertDialogAction>
          <AlertDialogAction asChild>
            <Button onClick={() => sendNotification("Hello", "Hi", user.id)} className="text-white">
              Send
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
