import { mockVenueEvents } from "@/lib/mock-data"
import { EditEventClient } from "@/app/(dashboard)/artist/events/[id]/edit/edit-client"

export default async function EditVenueEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = mockVenueEvents.find((e) => e.id === id) || mockVenueEvents[0]

  return <EditEventClient event={event} userRole="venue" />
}
