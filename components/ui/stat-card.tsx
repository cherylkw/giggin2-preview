import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon?: LucideIcon
  description?: string
}

export function StatCard({ title, value, change, changeType = "neutral", icon: Icon, description }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
        </div>
        {Icon && (
          <div className="rounded-lg bg-primary/20 p-2">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
      {(change || description) && (
        <div className="mt-3">
          {change && (
            <span
              className={cn(
                "text-sm font-medium",
                changeType === "positive" && "text-chart-3",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground",
              )}
            >
              {change}
            </span>
          )}
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
      )}
    </div>
  )
}
