"use client"

import { Lightbulb, TrendingUp, Users, Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AIBadge } from "@/components/ui/ai-badge"
import { Button } from "@/components/ui/button"

interface InsightCardProps {
  insight: {
    type: "trend" | "recommendation" | "opportunity" | "alert"
    title: string
    description: string
    metrics?: {
      label: string
      value: string | number
      icon?: "users" | "trending" | "calendar" | "location"
    }[]
    actionLabel?: string
    actionHref?: string
  }
  confidenceLabel?: string
}

export function InsightCard({ insight, confidenceLabel = "AI-Powered" }: InsightCardProps) {
  const getTypeColor = () => {
    if (insight.type === "alert") return "border-red-500/50 bg-red-500/5"
    if (insight.type === "opportunity") return "border-green-500/50 bg-green-500/5"
    if (insight.type === "recommendation") return "border-primary/50 bg-primary/5"
    return "border-border bg-card"
  }

  const getIcon = (iconType?: string) => {
    if (iconType === "users") return <Users className="h-4 w-4" />
    if (iconType === "trending") return <TrendingUp className="h-4 w-4" />
    if (iconType === "calendar") return <Calendar className="h-4 w-4" />
    if (iconType === "location") return <MapPin className="h-4 w-4" />
    return null
  }

  return (
    <div className={`overflow-hidden rounded-xl border p-6 ${getTypeColor()}`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <AIBadge text={confidenceLabel} />
            <Badge variant="secondary" className="text-xs capitalize">
              {insight.type}
            </Badge>
          </div>
          <h3 className="font-semibold text-foreground text-lg">{insight.title}</h3>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{insight.description}</p>

      {insight.metrics && insight.metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {insight.metrics.map((metric, idx) => (
            <div key={idx} className="rounded-lg bg-secondary/50 p-3">
              <div className="flex items-center gap-2 mb-1">
                {getIcon(metric.icon)}
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{metric.value}</p>
            </div>
          ))}
        </div>
      )}

      {insight.actionLabel && (
        <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          {insight.actionLabel}
        </Button>
      )}
    </div>
  )
}
