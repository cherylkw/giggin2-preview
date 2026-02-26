"use client"
import { mockEvents } from "@/lib/mock-data"
import { EditEventClient } from "@/app/(dashboard)/artist/events/[id]/edit/edit-client"

export default async function PromoterEditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = mockEvents.find((e) => e.id === id) || mockEvents[0]

  return <EditEventClient event={event} userRole="promoter" />
}
