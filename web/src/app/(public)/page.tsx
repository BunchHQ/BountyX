import InstallAppButton from "@/components/reusable/InstallAppButton"
import { Button } from "@/components/ui/button"
import getUser from "@/utils/supabase/server"
import Link from "next/link"

export default async function LandingPage() {
  const authUser = await getUser()

  return (
    <main className="space-y-4">
      <div className="prose dark:prose-invert prose-h1:mb-0 prose-p:my-2">
        <div className="w-full">
          <h1>BountyX</h1>
          <p>Earn. Help. Deliver. Repeat.</p>
        </div>
      </div>

      <div className="mt-8 space-x-4">
        {authUser === null ? (
          <>
            <Button asChild>
              <Link href="/signup">Signup now</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Login to App</Link>
            </Button>
          </>
        ) : (
          <Button asChild>
            <Link href="/app">Go to App</Link>
          </Button>
        )}
        <InstallAppButton />
      </div>
    </main>
  )
}
