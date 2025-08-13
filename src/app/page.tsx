import QuestsList from "@/components/questboard/QuestsList"

export default function HomePage() {
  return (
    <main className="">
      <div className="prose dark:prose-invert prose-h1:mb-0">
        <h1>Questboard</h1>
        <p className="text-muted-foreground">Currently active quests</p>
        <QuestsList />
      </div>
    </main>
  )
}
