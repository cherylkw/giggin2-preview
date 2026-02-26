"use client"

import { useState } from "react"
import { AlertTriangle, Activity, Users, Bot, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SignalMetric {
  id: string
  label: string
  status: "OK" | "Warning" | "Critical"
  description: string
  count?: number
}

interface AntiScalperSignalsProps {
  eventId?: string
}

const statusColors = {
  OK: "bg-green-500/20 text-green-400 border-green-500/30",
  Warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Critical: "bg-red-500/20 text-red-400 border-red-500/30",
}

const statusIcons = {
  OK: "text-green-400",
  Warning: "text-amber-400",
  Critical: "text-red-400",
}

export function AntiScalperSignals({ eventId }: AntiScalperSignalsProps) {
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const metrics: SignalMetric[] = [
    {
      id: "velocity",
      label: "High velocity purchases",
      status: "OK",
      description: "Normal purchase patterns detected",
      count: 0,
    },
    {
      id: "ip",
      label: "Repeated purchases from same IP/device",
      status: "Warning",
      description: "12 accounts flagged",
      count: 12,
    },
    {
      id: "activity",
      label: "Accounts with no fan activity",
      status: "OK",
      description: "All purchasers have profile activity",
      count: 3,
    },
    {
      id: "groupbuy",
      label: "Unusual Group Buy behavior",
      status: "OK",
      description: "No suspicious patterns",
      count: 0,
    },
  ]

  const getIcon = (id: string) => {
    switch (id) {
      case "velocity":
        return <Activity className="h-4 w-4" />
      case "ip":
        return <Bot className="h-4 w-4" />
      case "activity":
        return <Users className="h-4 w-4" />
      case "groupbuy":
        return <ShoppingCart className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  return (
    <>
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Anti-Scalper Signals</h3>
            <p className="text-sm text-muted-foreground">Real-time fraud detection</p>
          </div>
        </div>

        <div className="space-y-3">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <div className={statusIcons[metric.status]}>{getIcon(metric.id)}</div>
                <div>
                  <p className="text-sm font-medium text-foreground">{metric.label}</p>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
              </div>
              <Badge variant="outline" className={statusColors[metric.status]}>
                {metric.status}
              </Badge>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4 bg-transparent" onClick={() => setShowDetailsModal(true)}>
          View Details
        </Button>
      </div>

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-lg mx-4 rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Suspicious Activity Details</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowDetailsModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <p className="text-sm text-amber-400 font-medium mb-2">Flagged Accounts: 12</p>
                <p className="text-sm text-muted-foreground">
                  12 accounts have been flagged for repeated purchases from the same IP address or device fingerprint.
                  These purchases are under review and may be subject to cancellation.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-secondary border border-border">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Actions taken:</strong>
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• 8 purchases flagged for manual review</li>
                  <li>• 2 accounts temporarily suspended</li>
                  <li>• 2 accounts cleared after verification</li>
                </ul>
              </div>

              <p className="text-xs text-muted-foreground">
                Giggin&apos;s AI continuously monitors purchase patterns to protect real fans. Flagged accounts do not
                affect event ticket counts until resolved.
              </p>
            </div>

            <Button className="w-full mt-4" onClick={() => setShowDetailsModal(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
