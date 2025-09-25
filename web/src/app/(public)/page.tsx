import InstallAppButton from "@/components/reusable/InstallAppButton"
import { Button } from "@/components/ui/button"
import getUser from "@/utils/supabase/server"
import Link from "next/link"
import Image from "next/image"
import { LogInIcon, UserRoundIcon } from "lucide-react"

export default async function LandingPage() {
  const authUser = await getUser()

  return (
    <main className="space-y-4">
      <div className="prose dark:prose-invert prose-h1:mb-0 prose-p:my-2">
        <div className="flex flex-row items-center justify-start gap-2">
          <Image
            src="/icon512_rounded.png"
            alt="app-icon"
            priority={true}
            width={128}
            height={128}
            className="inline rounded-lg"
          />
          <div className="">
            <h1>BountyX</h1>
            <p>Earn. Help. Deliver. Repeat.</p>
          </div>

          <div className="ms-8">
            <InstallAppButton />
          </div>
        </div>
      </div>
      <div className="prose dark:prose-invert mx-auto w-full text-center">
        <h2>Post a Bounty</h2>
        <h2>Wait for someone to claim</h2>
        <h2>Help with someone else's Bounty</h2>
      </div>
      <div className="mx-auto mt-8 space-x-4 text-center">
        {authUser === null ? (
          <>
            <Button asChild variant={"secondary"}>
              <Link href="/login">
                <LogInIcon />
                Login to App
              </Link>
            </Button>
            <Button asChild variant={"secondary"}>
              <Link href="/signup">
                <UserRoundIcon />
                Signup now
              </Link>
            </Button>
          </>
        ) : (
          <Button asChild>
            <Link href="/app">Go to App</Link>
          </Button>
        )}
      </div>
    </main>
  )
}
