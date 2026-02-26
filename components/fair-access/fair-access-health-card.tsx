"use client"

import { Shield } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface EventFairAccess {
  id: string
  name: string
  date: string
  healthScore: "Strong" | "Moderate" | "Weak"
  protectionsEnabled: number
  totalProtections: number
}

interface FairAccessHealthCardProps {
  events: EventFairAccess[]
  userRole?: "artist" | "promoter"
}

const healthColors = {
  Strong: "bg-green-500/20 text-green-400 border-green-500/30",
  Moderate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Weak: "bg-red-500/20 text-red-400 border-red-500/30",
}

export function FairAccessHealthCard({ events, userRole = "artist" }: FairAccessHealthCardProps) {
  const basePath = userRole === "promoter" ? "/promoter/insights?tab=fair-access" : "/artist/insights?tab=fair-access"

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Fair Access Health</h3>
          <p className="text-sm text-muted-foreground">Protection status for your events</p>
        </div>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`${basePath}&eventId=${event.id}`}
            className="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/50 hover:border-primary/50 transition-colors cursor-pointer"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{event.name}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} •{" "}
                {event.protectionsEnabled}/{event.totalProtections} protections
              </p>
            </div>
            <Badge variant="outline" className={healthColors[event.healthScore]}>
              {event.healthScore}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}
