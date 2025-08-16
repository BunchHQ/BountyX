import { Button } from "@/components/ui/button"
import getUser from "@/utils/supabase/server"
import Image from "next/image"
import Link from "next/link"
import AccountMenu from "./AccountMenu"
import { ColorModeToggle } from "./reusable/ColorModeToggle"
import PushNotificationManager from "./notifications/PushNotificationManager"

const Header = async () => {
  const user = await getUser()

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="flex h-16 w-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center justify-center space-x-2 text-xl font-bold">
            <Image
              src="/web-app-manifest-512x512.png"
              alt="app-icon"
              width={32}
              height={32}
              className="inline rounded-lg"
            />
            <span className="">
              Bounty<span className="text-xl">X</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ColorModeToggle />
          {user && <PushNotificationManager user={user} />}
          {user ? (
            <AccountMenu />
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
