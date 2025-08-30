import { env } from "@/env"
import { createClient } from "@/utils/supabase/server"
import { type EmailOtpType } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

const REDIRECT_AFTER_SIGNUP_PATH = "/"
const ERROR_PATH = "/error"

// Creating a handler to a GET request to route /auth/confirm
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type") as EmailOtpType | null

  const redirectBaseUrl = env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin

  const returnRedirectResponse = (pathname: string): NextResponse => {
    const redirectUrl = new URL(pathname, redirectBaseUrl)
    console.log(`Redirecting to: ${redirectUrl.toString()}`)
    return NextResponse.redirect(redirectUrl)
  }

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      console.log("Email verification successful.")
      return returnRedirectResponse(REDIRECT_AFTER_SIGNUP_PATH)
    }

    console.error("Email verification failed:", error.message)
  } else {
    console.error("Verification failed: Missing 'token_hash' or 'type' in query parameters.")
  }

  console.log("Redirecting user to error page.")
  return returnRedirectResponse(ERROR_PATH)
}
