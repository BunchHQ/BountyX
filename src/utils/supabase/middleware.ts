import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

const PUBLIC_PATHS = ["/login", "/signup", "/auth/confirm"]

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // refreshing the auth token
  const user = await supabase.auth.getUser()

  // don't allow access to / for unauthenticated users expect for PUBLIC_PATHS
  if (
    request.nextUrl.pathname.startsWith("/") &&
    !PUBLIC_PATHS.includes(request.nextUrl.pathname) &&
    user.error
  ) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return supabaseResponse
}
