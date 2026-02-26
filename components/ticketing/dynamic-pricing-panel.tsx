"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Zap, Info } from "lucide-react"
import { AIBadge } from "@/components/ui/ai-badge"
import { Slider } from "@/components/ui/slider"

type TierTab = "ga" | "vip" | "balcony"
type DateTab = "early" | "regular" | "lastMinute"

const tierPricing = {
  ga: { base: 65, recommended: [55, 75], current: 65 },
  vip: { base: 120, recommended: [100, 140], current: 120 },
  balcony: { base: 45, recommended: [35, 55], current: 45 },
}

const datePricing = {
  early: { modifier: -15, label: "Early Bird (-15%)" },
  regular: { modifier: 0, label: "Regular (Base)" },
  lastMinute: { modifier: 20, label: "Last Minute (+20%)" },
}

export function DynamicPricingPanel() {
  const [tierTab, setTierTab] = useState<TierTab>("ga")
  const [dateTab, setDateTab] = useState<DateTab>("regular")
  const [experimentPrice, setExperimentPrice] = useState(65)

  const currentTier = tierPricing[tierTab]
  const dateModifier = datePricing[dateTab].modifier

  // Calculate predictions based on price
  const baseDemand = 82
  const priceDiff = experimentPrice - currentTier.base
  const demandChange = Math.round(priceDiff * -0.4)
  const predictedDemand = Math.max(20, Math.min(98, baseDemand + demandChange))

  const baseRevenue = currentTier.base * baseDemand * 100
  const predictedRevenue = experimentPrice * predictedDemand * 100
  const revenueChange = ((predictedRevenue - baseRevenue) / baseRevenue) * 100

  // Determine price zone
  const getPriceZone = () => {
    if (experimentPrice < currentTier.recommended[0]) return { zone: "Underpriced", color: "text-amber-500" }
    if (experimentPrice > currentTier.recommended[1]) return { zone: "Risk of drop-off", color: "text-red-500" }
    return { zone: "Optimal", color: "text-emerald-500" }
  }

  const priceZone = getPriceZone()

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">AI Pricing Insights</h2>
        </div>
        <AIBadge text="Dynamic Pricing" />
      </div>

      {/* Tabs */}
      <div className="mb-6 space-y-4">
        {/* Tier Tabs */}
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">By Seat Tier</p>
          <div className="flex gap-2">
            {(["ga", "vip", "balcony"] as TierTab[]).map((tier) => (
              <button
                key={tier}
                onClick={() => {
                  setTierTab(tier)
                  setExperimentPrice(tierPricing[tier].base)
                }}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  tierTab === tier
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {tier === "ga" ? "GA" : tier === "vip" ? "VIP" : "Balcony"}
              </button>
            ))}
          </div>
        </div>

        {/* Date Tabs */}
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">By Date</p>
          <div className="flex gap-2">
            {(["early", "regular", "lastMinute"] as DateTab[]).map((date) => (
              <button
                key={date}
                onClick={() => setDateTab(date)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  dateTab === date
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {date === "early" ? "Early Bird" : date === "regular" ? "Regular" : "Last Minute"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Demand vs Price Chart */}
      <div className="mb-6 rounded-lg border border-border bg-secondary/30 p-4">
        <p className="mb-3 text-sm font-medium text-foreground">Demand vs Price Curve</p>
        <div className="relative h-32">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-xs text-muted-foreground">
            <span>100%</span>
            <span>50%</span>
            <span>0%</span>
          </div>

          {/* Chart area */}
          <div className="ml-8 h-full">
            {/* Recommended band */}
            <div
              className="absolute h-full bg-emerald-500/10 border-x border-emerald-500/30"
              style={{
                left: `${((currentTier.recommended[0] - 20) / 180) * 100 + 10}%`,
                width: `${((currentTier.recommended[1] - currentTier.recommended[0]) / 180) * 100}%`,
              }}
            />

            {/* Curve line (simplified) */}
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 0 10 Q 25 15, 50 40 T 100 90" stroke="#B96CFF" strokeWidth="2" fill="none" opacity="0.8" />
            </svg>

            {/* Current price marker */}
            <div
              className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ left: `${((experimentPrice - 20) / 180) * 100}%` }}
            >
              <div className="h-16 w-0.5 bg-primary" />
              <div className="mt-1 rounded bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                ${experimentPrice}
              </div>
            </div>
          </div>

          {/* X-axis labels */}
          <div className="mt-2 ml-8 flex justify-between text-xs text-muted-foreground">
            <span>$20</span>
            <span className="text-emerald-500">Optimal</span>
            <span>$200</span>
          </div>
        </div>

        {/* Zone labels */}
        <div className="mt-4 flex justify-between text-xs">
          <span className="text-amber-500">Underpriced</span>
          <span className="text-emerald-500">Optimal</span>
          <span className="text-red-500">Risk of drop-off</span>
        </div>
      </div>

      {/* Experiment Slider */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">Experiment with Price</p>
          <span className={`text-sm font-medium ${priceZone.color}`}>{priceZone.zone}</span>
        </div>
        <Slider
          value={[experimentPrice]}
          onValueChange={(val) => setExperimentPrice(val[0])}
          min={20}
          max={200}
          step={5}
          className="my-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$20</span>
          <span className="text-foreground font-medium">${experimentPrice}</span>
          <span>$200</span>
        </div>
      </div>

      {/* Predictions */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-border bg-secondary/50 p-3">
          <p className="text-xs text-muted-foreground">Predicted Demand</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">{predictedDemand}%</span>
            {demandChange !== 0 && (
              <span className={`flex items-center text-xs ${demandChange > 0 ? "text-emerald-500" : "text-red-500"}`}>
                {demandChange > 0 ? (
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-0.5" />
                )}
                {Math.abs(demandChange)}%
              </span>
            )}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-secondary/50 p-3">
          <p className="text-xs text-muted-foreground">Projected Revenue</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">${(predictedRevenue / 1000).toFixed(0)}k</span>
            {revenueChange !== 0 && (
              <span className={`flex items-center text-xs ${revenueChange > 0 ? "text-emerald-500" : "text-red-500"}`}>
                {revenueChange > 0 ? (
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-0.5" />
                )}
                {Math.abs(revenueChange).toFixed(0)}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* AI Explanation */}
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
        <p className="text-sm text-muted-foreground">
          {experimentPrice > currentTier.base ? (
            <>
              Raising {tierTab === "ga" ? "GA" : tierTab === "vip" ? "VIP" : "Balcony"} from ${currentTier.base} to $
              {experimentPrice} may reduce demand by {Math.abs(demandChange)}% but{" "}
              {revenueChange > 0
                ? `increases projected revenue by ${revenueChange.toFixed(0)}%`
                : `decreases projected revenue by ${Math.abs(revenueChange).toFixed(0)}%`}
              .
            </>
          ) : experimentPrice < currentTier.base ? (
            <>
              Lowering {tierTab === "ga" ? "GA" : tierTab === "vip" ? "VIP" : "Balcony"} from ${currentTier.base} to $
              {experimentPrice} may increase demand by {Math.abs(demandChange)}% but{" "}
              {revenueChange < 0
                ? `decreases projected revenue by ${Math.abs(revenueChange).toFixed(0)}%`
                : `increases projected revenue by ${revenueChange.toFixed(0)}%`}
              .
            </>
          ) : (
            <>Current price is at baseline. Adjust the slider to see demand and revenue projections.</>
          )}
        </p>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        <Info className="mr-1 inline h-3 w-3" />
        Powered by Giggin&apos; AI Pricing Engine (simulated in prototype)
      </p>
    </div>
  )
}
