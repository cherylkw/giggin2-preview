import { mockEvents } from "@/lib/mock-data"
import { EventManagementClient } from "./event-management-client"

export default async function EventManagementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const event = mockEvents.find((e) => e.id === id) || {
    id,
    name: "Event Not Found",
    artist: "Unknown",
    venue: "Unknown Venue",
    city: "Unknown City",
    date: new Date().toISOString().split("T")[0],
    time: "8:00 PM",
    genre: "Music",
    image: "/vibrant-concert-stage.png",
    price: { min: 50, max: 150 },
    attendance: { projected: 500, capacity: 1000 },
    demand: 75,
  }

  return <EventManagementClient event={event} userRole="artist" />
}
