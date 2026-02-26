import { mockPromoterEvents, mockEvents } from "@/lib/mock-data"
import { EventManagementClient } from "@/app/(dashboard)/artist/events/[id]/event-management-client"

export default async function PromoterEventManagementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Check promoter events first, then fall back to general events
  const event = mockPromoterEvents.find((e) => e.id === id) ||
    mockEvents.find((e) => e.id === id) || {
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
      createdBy: "promoter",
      status: "draft",
    }

  return <EventManagementClient event={event} userRole="promoter" />
}
