import { Item, QuestStatus, type Quest } from "@prisma/client"
import QuestCard from "./QuestCard"

export default function QuestsList() {
  const dummyQuests: Array<Quest> = [
    {
      id: "quest-1",
      item: Item.FOOD,
      details: "Need someone to pick up lunch from downtown restaurant",
      reward: 250,
      destination: "Office Building, Floor 5",
      deadline: new Date("2024-01-15T12:00:00Z"),
      status: QuestStatus.POSTED,
      posterId: "user-1",
      claimerId: null,
      createdAt: new Date("2024-01-10T09:00:00Z"),
      updatedAt: new Date("2024-01-10T09:00:00Z"),
    },
    {
      id: "quest-2",
      item: Item.OTHER,
      details: "Urgent document delivery to client office",
      reward: 500,
      destination: "Business District, Tower A",
      deadline: new Date("2024-01-14T17:00:00Z"),
      status: QuestStatus.COMPLETED,
      posterId: "user-2",
      claimerId: "user-3",
      createdAt: new Date("2024-01-09T14:30:00Z"),
      updatedAt: new Date("2024-01-12T10:15:00Z"),
    },
    {
      id: "quest-3",
      item: Item.GROCERY,
      details: "Weekly grocery shopping for elderly neighbor",
      reward: 300,
      destination: "Apartment 4B, Green Valley Complex",
      deadline: new Date("2024-01-16T18:00:00Z"),
      status: QuestStatus.CANCELLED,
      posterId: "user-4",
      claimerId: null,
      createdAt: new Date("2024-01-11T08:45:00Z"),
      updatedAt: new Date("2024-01-11T08:45:00Z"),
    },
    {
      id: "quest-4",
      item: Item.MEDICINE,
      details: "Pick up prescription from pharmacy",
      reward: 200,
      destination: "Green Park Apartments, Unit 12",
      deadline: new Date("2024-01-13T20:00:00Z"),
      status: QuestStatus.CLAIMED,
      posterId: "user-5",
      claimerId: "user-6",
      createdAt: new Date("2024-01-08T11:20:00Z"),
      updatedAt: new Date("2024-01-13T19:30:00Z"),
    },
    {
      id: "quest-5",
      item: Item.STATIONERY,
      details: "Return library books and pick up reserved items",
      reward: 150,
      destination: "University Campus, Hostel Block C",
      deadline: null,
      status: QuestStatus.CANCELLED,
      posterId: "user-7",
      claimerId: null,
      createdAt: new Date("2024-01-12T16:00:00Z"),
      updatedAt: new Date("2024-01-12T16:00:00Z"),
    },
    {
      id: "quest-6",
      item: Item.TICKETS,
      details: "Laptop repair pickup and delivery",
      reward: 400,
      destination: "Tech Hub, Service Center",
      deadline: new Date("2024-01-17T15:00:00Z"),
      status: QuestStatus.POSTED,
      posterId: "user-8",
      claimerId: null,
      createdAt: new Date("2024-01-13T12:30:00Z"),
      updatedAt: new Date("2024-01-13T12:30:00Z"),
    },
  ]
  return (
    <div className="grid grid-cols-1 gap-4">
      {dummyQuests.map(quest => (
        <QuestCard quest={quest} key={quest.id} />
      ))}
    </div>
  )
}
