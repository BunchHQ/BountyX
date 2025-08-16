// @ts-nocheck
self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json()
    console.log("Push Event Data", data)
    const options = {
      body: data.body,
      icon: data.icon || "/icon.png",
      badge: "/badge.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "2",
      },
    }
    event.waitUntil(
      self.registration.showNotification(data.title, options).then(() => {
        sendDeliveryReportAction()
      }),
    )
  }
})

const sendDeliveryReportAction = () => {
  console.log("Web push delivered.")
}

self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received.")
  event.notification.close()
  event.waitUntil(clients.openWindow("https://bountyx.onrender.com"))
})
