import { mockEvents } from "@/lib/mock-data"
import { EditEventClient } from "./edit-client"

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = mockEvents.find((e) => e.id === id) || mockEvents[0]

  return <EditEventClient event={event} userRole="artist" />
}
