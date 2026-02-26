"use client"

import { TrendingUp, TrendingDown, Users, DollarSign, AlertCircle } from "lucide-react"
import { AIBadge } from "@/components/ui/ai-badge"
import { Progress } from "@/components/ui/progress"

interface PredictionCardProps {
  prediction: {
    type: "attendance" | "revenue" | "demand"
    title: string
    value: number
    unit: string
    confidence: number
    trend: "up" | "down" | "stable"
    trendPercent: number
    details: string
    factors: string[]
    comparison?: {
      label: string
      value: number
    }
  }
  confidenceLabel?: string
}

export function PredictionCard({ prediction, confidenceLabel = "Projected" }: PredictionCardProps) {
  const getTrendIcon = () => {
    if (prediction.trend === "up") return <TrendingUp className="h-5 w-5 text-green-500" />
    if (prediction.trend === "down") return <TrendingDown className="h-5 w-5 text-red-500" />
    return <TrendingUp className="h-5 w-5 text-muted-foreground" />
  }

  const getTrendColor = () => {
    if (prediction.trend === "up") return "text-green-500"
    if (prediction.trend === "down") return "text-red-500"
    return "text-muted-foreground"
  }

  const getTypeIcon = () => {
    if (prediction.type === "attendance") return <Users className="h-5 w-5" />
    if (prediction.type === "revenue") return <DollarSign className="h-5 w-5" />
    return <TrendingUp className="h-5 w-5" />
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">{getTypeIcon()}</div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AIBadge text={confidenceLabel} />
            </div>
            <h3 className="font-semibold text-foreground">{prediction.title}</h3>
          </div>
        </div>
        {getTrendIcon()}
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-foreground">{prediction.value.toLocaleString()}</span>
          <span className="text-lg text-muted-foreground">{prediction.unit}</span>
        </div>
        <div className={`mt-1 flex items-center gap-1 text-sm ${getTrendColor()}`}>
          <span>
            {prediction.trend === "up" ? "+" : ""}
            {prediction.trendPercent}%
          </span>
          <span className="text-muted-foreground">vs. similar events</span>
        </div>
      </div>

      {prediction.comparison && (
        <div className="mb-4 rounded-lg bg-secondary/50 p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{prediction.comparison.label}</span>
            <span className="font-semibold text-foreground">{prediction.comparison.value.toLocaleString()}</span>
          </div>
        </div>
      )}

      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Confidence Level</span>
          <span>{prediction.confidence}%</span>
        </div>
        <Progress value={prediction.confidence} className="h-2" />
      </div>

      <p className="text-sm text-muted-foreground mb-4">{prediction.details}</p>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <AlertCircle className="h-4 w-4" />
          <span className="font-medium">Key Factors:</span>
        </div>
        <ul className="space-y-1 pl-6">
          {prediction.factors.map((factor, idx) => (
            <li key={idx} className="text-xs text-muted-foreground list-disc">
              {factor}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
