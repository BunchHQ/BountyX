import BottomNavigationBar, {
  type BottomNavigationBarOptions,
} from "@/components/BottomNavigationBar"
import Header from "@/components/Navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import "@/styles/globals.css"
import { ScrollTextIcon, TrophyIcon, UserIcon } from "lucide-react"

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

const navigationOptions: Array<BottomNavigationBarOptions> = [
  { label: "Questboard", value: "/", icon: <ScrollTextIcon /> },
  { label: "Profile", value: "/profile", icon: <UserIcon /> },
  { label: "Hall of Fame", value: "/hall-of-fame", icon: <TrophyIcon /> },
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${libre.variable} ${lora.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableColorScheme enableSystem>
          <Header />
          <div className="mx-auto h-full min-h-svh w-full max-w-5xl px-8 py-16">{children}</div>
          <BottomNavigationBar options={navigationOptions} />
          <Toaster position={"top-center"} />
        </ThemeProvider>
      </body>
    </html>
  )
}
