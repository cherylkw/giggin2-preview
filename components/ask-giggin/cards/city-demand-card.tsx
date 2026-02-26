"use client"

import { TrendingUp, TrendingDown, Minus, Users, DollarSign, MapPin, BarChart3 } from "lucide-react"
import { AIBadge } from "@/components/ui/ai-badge"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface CityDemandCardProps {
  city: {
    rank: number
    name: string
    state: string
    demandScore: number
    momentum: "Growing" | "Stable" | "Cooling"
    confidence: number
    projectedAttendance: { min: number; max: number }
    estimatedRevenue: { min: number; max: number }
    drivers: string[]
  }
}

export function CityDemandCard({ city }: CityDemandCardProps) {
  const getMomentumIcon = () => {
    if (city.momentum === "Growing") return <TrendingUp className="h-4 w-4 text-green-400" />
    if (city.momentum === "Cooling") return <TrendingDown className="h-4 w-4 text-red-400" />
    return <Minus className="h-4 w-4 text-amber-400" />
  }

  const getMomentumColor = () => {
    if (city.momentum === "Growing") return "text-green-400 bg-green-400/10 border-green-400/30"
    if (city.momentum === "Cooling") return "text-red-400 bg-red-400/10 border-red-400/30"
    return "text-amber-400 bg-amber-400/10 border-amber-400/30"
  }

  const getDemandColor = () => {
    if (city.demandScore >= 80) return "text-green-400"
    if (city.demandScore >= 60) return "text-amber-400"
    return "text-red-400"
  }

  const formatCurrency = (val: number) => {
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`
    return `$${val}`
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="p-6">
        {/* Header with rank and city */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
              {city.rank}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">{city.name}, {city.state}</h3>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="outline" className={`text-xs ${getMomentumColor()}`}>
                  {getMomentumIcon()}
                  <span className="ml-1">{city.momentum}</span>
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Confidence: {city.confidence}%
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">Demand Score</p>
            <p className={`text-3xl font-bold ${getDemandColor()}`}>{city.demandScore}</p>
          </div>
        </div>

        {/* Forecasts */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Projected Attendance</span>
            </div>
            <p className="text-base font-semibold text-foreground">
              {city.projectedAttendance.min.toLocaleString()} - {city.projectedAttendance.max.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Est. Ticket Revenue</span>
            </div>
            <p className="text-base font-semibold text-foreground">
              {formatCurrency(city.estimatedRevenue.min)} - {formatCurrency(city.estimatedRevenue.max)}
            </p>
          </div>
        </div>

        {/* Confidence bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Projection Confidence</span>
            <span>{city.confidence}%</span>
          </div>
          <Progress value={city.confidence} className="h-1.5" />
        </div>

        {/* Key Drivers */}
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <BarChart3 className="h-3.5 w-3.5" />
            <span className="font-medium">Key Drivers</span>
          </div>
          <ul className="space-y-1 pl-5">
            {city.drivers.map((driver, idx) => (
              <li key={idx} className="text-xs text-muted-foreground list-disc leading-relaxed">
                {driver}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
