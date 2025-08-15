"use server"

import { db } from "@/server/db"
import { handleError } from "@/lib/utils"
import { createClient } from "@/utils/supabase/server"
import { type User } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { getUserByEmail } from "@/actions/user"

export async function login(formData: FormData) {
  try {
    const supabase = await createClient()

    const credentials = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    if (!credentials.email || credentials.email.length > 255) {
      throw new Error("Invalid email")
    }

    if (!credentials.password || credentials.password.length < 6) {
      throw new Error("Invalid password")
    }

    const { error } = await supabase.auth.signInWithPassword(credentials)

    if (error) throw error

    revalidatePath("/", "layout")
    return { errorMessage: null }
  } catch (error) {
    return handleError(error)
  }
}

export async function logout() {
  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) throw error

    revalidatePath("/", "layout")
    return { errorMessage: null }
  } catch (error) {
    return handleError(error)
  }
}

export async function signup(formData: FormData) {
  try {
    const supabase = await createClient()

    const name = formData.get("name") as string
    const phone = formData.get("phone") as string

    if (!name || name.length < 3) throw new Error("Name must be at least 3 characters long")
    if (!phone || phone.length < 10 || phone.length > 12)
      throw new Error("Phone number must be at between 10 to 12 characters long")

    const credentials = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    if (!credentials.email || credentials.email.length > 255) {
      throw new Error("Invalid email")
    }

    if (!credentials.password || credentials.password.length < 6) {
      throw new Error("Invalid password")
    }

    const options = {
      data: {
        display_name: name,
        phone: phone,
      },
    }

    const existingUser: User | null = await getUserByEmail(credentials.email)

    if (existingUser) throw new Error("Email already exists")

    const { data, error } = await supabase.auth.signUp({
      ...credentials,
      options,
    })

    if (error) throw error

    const userId = data.user?.id
    if (!userId) throw new Error("Error signing up")

    await db.user.create({
      data: {
        id: userId,
        email: credentials.email,
        name,
        phone,
      },
    })

    revalidatePath("/", "layout")
    return { errorMessage: null }
  } catch (error) {
    return handleError(error)
  }
}

// export async function deleteAccount(id: string) {
//   try {
//     const supabase = await createServiceClient()

//     console.log("Deleting account with ID:", id)
//     const { error } = await supabase.auth.admin.deleteUser(id)

//     if (error) throw error

//     revalidatePath("/", "layout")
//     return { errorMessage: null }
//   } catch (error) {
//     return handleError(error)
//   }
// }
