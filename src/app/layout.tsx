import BottomNavigationBar, {
  type BottomNavigationBarOptions,
} from "@/components/BottomNavigationBar"
import { ThemeProvider } from "@/components/theme-provider"
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

const navigationOptions: Array<BottomNavigationBarOptions> = [
  { label: "Questboard", value: "/", icon: "📜" },
  { label: "Profile", value: "/profile", icon: "🧑‍🦱" },
  { label: "Hall of Fame", value: "/hall-of-fame", icon: "🏆" },
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
          <div className="h-full min-h-svh w-full">{children}</div>
          <BottomNavigationBar options={navigationOptions} />
        </ThemeProvider>
      </body>
    </html>
  )
}
