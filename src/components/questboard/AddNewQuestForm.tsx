"use client"

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
import { Item, QuestStatus, type Quest } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { createQuest } from "@/actions/quest"
import type { QuestCreateType } from "@/lib/types"

interface Props {
  userId: string
}

const rewardChoicesInINR = [0, 5, 10, 20, 50]
const deadlineChoicesInMinutes = [5, 10, 20, 30, 60, 120, 300]

const questSchema = z.object({
  item: z.enum(Item, { error: "Please select an item" }),
  details: z.string().optional(),
  reward: z
    .string()
    .refine(val => Number.parseInt(val) >= 0, { message: "Please enter a valid reward" }),
  destination: z.string().min(5, { error: "Please enter a valid destination" }),
  deadline: z
    .string()
    .refine(val => Number.parseInt(val) > 0, { message: "Please enter a valid deadline" }),
})

type QuestFormValues = z.infer<typeof questSchema>

export default function AddNewQuestForm({ userId }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<QuestFormValues>({
    resolver: zodResolver(questSchema),
    defaultValues: {
      item: undefined,
      destination: "",
      deadline: "5",
      reward: "5",
    },
  })

  function onSubmit(values: QuestFormValues) {
    const questData: QuestCreateType = {
      item: values.item,
      details: values.details || "",
      reward: Number.parseInt(values.reward),
      destination: values.destination,
      deadline: new Date(Date.now() + Number.parseInt(values.deadline) * 60 * 1000),
      posterId: userId,
      status: QuestStatus.POSTED,
    }

    startTransition(async () => {
      try {
        const quest: Quest = await createQuest(questData)
        form.reset()

        toast.success("Quest posted", {
          description: "Bounty has been offered successfully.",
          action: <Button onClick={() => router.push(`/bounty/${quest.id}`)}>View</Button>,
        })
      } catch (error) {
        console.error("Error posting bounty:", error)
        toast.error("Error", {
          description: "There was a problem offering the bounty.",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="item"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Item <span className="text-red-500">*</span>{" "}
              </FormLabel>
              <Select
                disabled={isPending}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl className="w-full">
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Item" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Item.STATIONERY}>Stationery (Copies, Pen etc)</SelectItem>
                  <SelectItem value={Item.MEDICINE}>Medicine</SelectItem>
                  <SelectItem value={Item.FOOD}>Food (Fast food, snacks)</SelectItem>
                  <SelectItem value={Item.TICKETS}>
                    Tickets (Movie tickets, train tickets)
                  </SelectItem>
                  <SelectItem value={Item.PURIFIED_WATER}>
                    Purified Water (Drinking Water)
                  </SelectItem>
                  <SelectItem value={Item.GROCERY}>Grocery (Fruits)</SelectItem>
                  <SelectItem value={Item.TRANSPORT}>Transport (Bring Auto)</SelectItem>
                  <SelectItem value={Item.OTHER}>Other (Type Below)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="details"
          disabled={isPending}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Details</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Extra details about the item you ask for"
                  className="min-h-[120px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reward"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reward (in INR)</FormLabel>
              <Select
                disabled={isPending}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl className="w-full">
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Reward" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {rewardChoicesInINR.map((reward, index) => (
                    <SelectItem key={index} value={reward.toString()}>
                      ₹{reward}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="destination"
          disabled={isPending}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>
                Destination <span className="text-red-500">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Where would you receive the item" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deadline"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deadline (in Minutes)</FormLabel>
              <Select
                disabled={isPending}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl className="w-full">
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Deadline" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {deadlineChoicesInMinutes.map((deadline, index) => (
                    <SelectItem key={index} value={deadline.toString()}>
                      {deadline}m
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : "Offer Bounty"}
        </Button>
      </form>
    </Form>
  )
}
