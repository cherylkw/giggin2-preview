"use client"

import { Shield } from "lucide-react"

interface FairAccessStripProps {
  maxTicketsPerFan: number
  verifiedOnly: boolean
}

export function FairAccessStrip({ maxTicketsPerFan, verifiedOnly }: FairAccessStripProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-sm">
      <Shield className="h-4 w-4 text-primary shrink-0" />
      <p className="text-foreground">
        <span className="font-medium">Group Buy is for real fans only.</span>{" "}
        <span className="text-muted-foreground">
          Limits: {maxTicketsPerFan} tickets per fan{verifiedOnly && ", verified accounts required"}.
        </span>
      </p>
    </div>
  )
}
