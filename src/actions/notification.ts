"use server"

import { env } from "@/env"
import { db } from "@/server/db"
import type { Subscription } from "@prisma/client"
import webpush from "web-push"

webpush.setVapidDetails(
  "mailto:bounty@bountyx.io",
  env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  env.VAPID_PRIVATE_KEY,
)

export async function subscribeUser(
  sub: webpush.PushSubscription,
  userId: string,
  userAgent?: string,
) {
  console.log("Subscribing", sub, userId)

  const { endpoint, keys } = sub
  const keysAuth = keys?.auth
  const keysP256dh = keys?.p256dh

  await db.subscription.upsert({
    where: {
      endpoint,
      userId,
    },
    update: {
      keysAuth,
      keysP256dh,
      endpoint,
      userAgent,
    },
    create: {
      endpoint,
      keysAuth,
      keysP256dh,
      userId,
      userAgent,
    },
  })

  return { success: true }
}

export async function unsubscribeUser(endpoint: string, userId: string) {
  await db.subscription.delete({ where: { endpoint, userId } })
  return { success: true }
}

export async function sendNotification(title: string, message: string, userId: string) {
  const subscriptions: Subscription[] = await db.subscription.findMany({ where: { userId } })
  if (!subscriptions.length) {
    throw new Error(`No subscriptions available for user: ${userId}`)
  }

  let allSent = true

  for (const sub of subscriptions) {
    console.debug("Got subscription", sub)
    const webSub: webpush.PushSubscription = {
      endpoint: sub.endpoint,
      keys: {
        auth: sub.keysAuth,
        p256dh: sub.keysP256dh,
      },
    }

    console.debug("Pushing", webSub)
    try {
      await webpush.sendNotification(
        webSub,
        JSON.stringify({
          title,
          body: message,
          icon: "/icon.png",
        }),
      )
    } catch (error: any) {
      allSent = false
      if (error.statusCode === 410) {
        await db.subscription.delete({ where: { endpoint: sub.endpoint } })
        console.log("Removed expired subscription for endpoint", sub.endpoint)
      }

      console.error("Error sending push notification:", error)
    }
  }

  return { success: allSent }
}
