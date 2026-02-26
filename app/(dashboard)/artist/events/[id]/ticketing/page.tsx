import { mockEvents } from "@/lib/mock-data"
import { EventTicketingClient } from "./ticketing-client"

export default async function EventTicketingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = mockEvents.find((e) => e.id === id) || mockEvents[0]

  return <EventTicketingClient event={event} />
}
