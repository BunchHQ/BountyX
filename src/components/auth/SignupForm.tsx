"use client"

import { signup } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Lock, Mail, Phone, User } from "lucide-react"
import { redirect } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const signupSchema = z.object({
  name: z
    .string()
    .min(3, {
      error: "Name must be at least 3 characters.",
    })
    .max(100, {
      error: "Name must be at most 100 characters.",
    }),
  email: z
    .string()
    .email({
      error: "Please enter a valid email address.",
    })
    .max(255, { error: "Email must be at most 255 characters." }),
  password: z.string().min(6, {
    error: "Password must be at least 6 characters.",
  }),
  phone: z
    .string()
    .min(10, {
      error: "Please enter a valid phone number.",
    })
    .max(12, {
      error: "Phone number must be at most 12 characters.",
    }),
})

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupForm() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  })

  const onSubmit = (values: SignupFormValues) => {
    startTransition(async () => {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value)
      })

      toast.promise(
        new Promise<void>(async (resolve, reject) => {
          const { errorMessage } = await signup(formData)
          if (errorMessage) {
            reject(errorMessage)
          } else {
            resolve()
          }
        }),
        {
          loading: "Please wait...",
          success: () => {
            return (
              <div>
                <div className="font-semibold">Signup Successful</div>
                <p>
                  Welcome on BountyX {formData.get("name")?.toString()}! Check your Inbox to confirm
                  your account
                </p>
              </div>
            )
          },
          error: reason => {
            return (
              <div>
                <div className="font-semibold">Error Signing Up</div>
                <p>{reason}</p>
              </div>
            )
          },
        },
      )

      redirect("/")
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    disabled={isPending}
                    className="bg-background"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    disabled={isPending}
                    className="bg-background"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Create a password"
                  disabled={isPending}
                  className="bg-background"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Enter your email"
                  disabled={isPending}
                  className="bg-background"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full py-6 text-base font-medium transition-all duration-200 hover:scale-[1.01]"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Form>
  )
}
