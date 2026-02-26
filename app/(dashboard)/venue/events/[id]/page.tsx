import { mockVenueEvents } from "@/lib/mock-data"
import { EventManagementClient } from "@/app/(dashboard)/artist/events/[id]/event-management-client" // Using shared EventManagementClient component

export default async function VenueEventManagementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const event = mockVenueEvents.find((e) => e.id === id) || {
    id,
    name: "Event Not Found",
    artist: "Unknown",
    venue: "The Blue Room",
    city: "Chicago",
    date: new Date().toISOString().split("T")[0],
    time: "8:00 PM",
    genre: "Music",
    image: "/vibrant-concert-stage.png",
    price: { min: 50, max: 150 },
    attendance: { projected: 500, capacity: 1000 },
    demand: 75,
    createdBy: "venue",
    status: "draft",
  }

  return <EventManagementClient event={event} userRole="venue" />
}
