"use client"

import { DollarSign, Building, Users, Megaphone, Wrench } from "lucide-react"
import { AIBadge } from "@/components/ui/ai-badge"
import { Separator } from "@/components/ui/separator"

interface CostBreakdownCardProps {
  breakdown: {
    eventName: string
    venueName: string
    city: string
    totalCost: number
    breakdown: {
      category: string
      amount: number
      icon: "venue" | "staff" | "promotion" | "equipment"
    }[]
  }
  confidenceLabel?: string
}

export function CostBreakdownCard({ breakdown, confidenceLabel = "Estimated" }: CostBreakdownCardProps) {
  const getIcon = (iconType: string) => {
    if (iconType === "venue") return <Building className="h-4 w-4" />
    if (iconType === "staff") return <Users className="h-4 w-4" />
    if (iconType === "promotion") return <Megaphone className="h-4 w-4" />
    if (iconType === "equipment") return <Wrench className="h-4 w-4" />
    return <DollarSign className="h-4 w-4" />
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AIBadge text={confidenceLabel} />
            </div>
            <h3 className="font-semibold text-foreground">Cost Breakdown</h3>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-1">
          {breakdown.venueName}, {breakdown.city}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-foreground">${breakdown.totalCost.toLocaleString()}</span>
          <span className="text-lg text-muted-foreground">total</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-3">
        {breakdown.breakdown.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-secondary/50 p-2 text-muted-foreground">{getIcon(item.icon)}</div>
              <span className="text-sm text-foreground">{item.category}</span>
            </div>
            <span className="text-sm font-semibold text-foreground">${item.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-primary/5 border border-primary/20 p-3">
        <p className="text-xs text-muted-foreground">
          Cost estimates include venue rental, staffing, promotion budget, and equipment. Actual costs may vary based on
          final negotiations and requirements.
        </p>
      </div>
    </div>
  )
}
