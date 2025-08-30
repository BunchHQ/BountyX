import SignupForm from "@/components/auth/SignupForm"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import getUser from "@/utils/supabase/server"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function SignupPage() {
  const user = await getUser()

  if (user) {
    redirect("/")
  }

  return (
    <Card className="m-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="font-title text-center text-2xl font-bold tracking-tight">
          Create your Account
        </CardTitle>
        <CardDescription className="text-muted-foreground text-center">
          Enter your information to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium">
            Log in
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
