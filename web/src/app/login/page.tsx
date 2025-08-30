import getUser from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LoginForm from "@/components/auth/LoginForm"
import Link from "next/link"

export default async function LoginPage() {
  const user = await getUser()

  if (user) {
    redirect("/")
  }

  return (
    <Card className="m-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-title text-center text-2xl font-bold tracking-tight">
          Log in to your Account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials below to log in
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <LoginForm />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary font-medium">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
