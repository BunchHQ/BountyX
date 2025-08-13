import "@/styles/globals.css"

import type { Metadata } from "next"
import { IBM_Plex_Mono, Libre_Baskerville, Lora } from "next/font/google"

export const metadata: Metadata = {
  title: "Quests",
  description: "Small Quests, Big Help.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

const libre = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  weight: ["400", "700"],
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "700"],
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${libre.variable} ${lora.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
