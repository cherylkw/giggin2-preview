"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Play, Ticket, FileText, User, Building, Megaphone, Briefcase, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AIBadge } from "@/components/ui/ai-badge"

interface Participant {
  role: string
  name: string
  percentage: number
  color: string
  icon: React.ElementType
  amount: number
}

const participants: Participant[] = [
  { role: "Artist", name: "Neon Dreams", percentage: 60, color: "#B96CFF", icon: User, amount: 0 },
  { role: "Venue", name: "The Warehouse", percentage: 25, color: "#22c55e", icon: Building, amount: 0 },
  { role: "Promoter", name: "LiveNation Pro", percentage: 10, color: "#f59e0b", icon: Megaphone, amount: 0 },
  { role: "Manager", name: "Stellar Mgmt", percentage: 5, color: "#3b82f6", icon: Briefcase, amount: 0 },
]

const settlementHistory = [
  {
    date: "2024-01-15",
    tickets: 250,
    total: 20000,
    splits: { artist: 12000, venue: 5000, promoter: 2000, manager: 1000 },
  },
  {
    date: "2024-01-22",
    tickets: 180,
    total: 14400,
    splits: { artist: 8640, venue: 3600, promoter: 1440, manager: 720 },
  },
  {
    date: "2024-01-29",
    tickets: 320,
    total: 25600,
    splits: { artist: 15360, venue: 6400, promoter: 2560, manager: 1280 },
  },
]

export function SettlementAnimation() {
  const [isSimulating, setIsSimulating] = useState(false)
  const [ticketCount, setTicketCount] = useState(0)
  const [currentParticipants, setCurrentParticipants] = useState(participants)
  const [activeTab, setActiveTab] = useState<"simulate" | "history">("simulate")
  const [animationPhase, setAnimationPhase] = useState<"idle" | "tickets" | "contract" | "distribution">("idle")

  const ticketPrice = 80
  const targetTickets = 100

  useEffect(() => {
    if (!isSimulating) return

    setAnimationPhase("tickets")

    // Animate ticket counter
    const ticketInterval = setInterval(() => {
      setTicketCount((prev) => {
        if (prev >= targetTickets) {
          clearInterval(ticketInterval)
          setAnimationPhase("contract")

          // After tickets, animate distribution
          setTimeout(() => {
            setAnimationPhase("distribution")
            animateDistribution()
          }, 800)

          return targetTickets
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(ticketInterval)
  }, [isSimulating])

  const animateDistribution = () => {
    const totalRevenue = targetTickets * ticketPrice
    let step = 0
    const maxSteps = 50

    const distributionInterval = setInterval(() => {
      step++
      const progress = step / maxSteps

      setCurrentParticipants((prev) =>
        prev.map((p) => ({
          ...p,
          amount: Math.round(((totalRevenue * p.percentage) / 100) * progress),
        })),
      )

      if (step >= maxSteps) {
        clearInterval(distributionInterval)
        setTimeout(() => setIsSimulating(false), 1000)
      }
    }, 40)
  }

  const startSimulation = () => {
    setTicketCount(0)
    setCurrentParticipants(participants.map((p) => ({ ...p, amount: 0 })))
    setAnimationPhase("idle")
    setIsSimulating(true)
  }

  const totalRevenue = ticketCount * ticketPrice

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Smart Contract Settlement</h2>
        </div>
        <AIBadge text="Auto-Split" />
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setActiveTab("simulate")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "simulate"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          <Play className="mr-2 inline h-4 w-4" />
          Simulate
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "history"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          <History className="mr-2 inline h-4 w-4" />
          Settlement History (Demo)
        </button>
      </div>

      {activeTab === "simulate" ? (
        <>
          {/* Animated Flow Diagram */}
          <div className="mb-6 rounded-xl border border-border bg-secondary/30 p-6">
            <div className="flex items-center justify-between">
              {/* Ticket Icon */}
              <div
                className={`flex flex-col items-center transition-all duration-300 ${
                  animationPhase === "tickets" ? "scale-110" : ""
                }`}
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full border-2 ${
                    animationPhase === "tickets"
                      ? "border-primary bg-primary/20 animate-pulse"
                      : "border-border bg-secondary"
                  }`}
                >
                  <Ticket className="h-8 w-8 text-primary" />
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">{ticketCount} Tickets</p>
                <p className="text-xs text-muted-foreground">${totalRevenue.toLocaleString()}</p>
              </div>

              {/* Arrow / Flow Line */}
              <div className="flex-1 mx-4 relative">
                <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{
                      width:
                        animationPhase === "idle"
                          ? "0%"
                          : animationPhase === "tickets"
                            ? "33%"
                            : animationPhase === "contract"
                              ? "66%"
                              : "100%",
                    }}
                  />
                </div>
                {/* Animated token */}
                {isSimulating && (
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary shadow-lg shadow-primary/50 transition-all duration-500"
                    style={{
                      left:
                        animationPhase === "idle"
                          ? "0%"
                          : animationPhase === "tickets"
                            ? "30%"
                            : animationPhase === "contract"
                              ? "60%"
                              : "95%",
                    }}
                  />
                )}
              </div>

              {/* Smart Contract Block */}
              <div
                className={`flex flex-col items-center transition-all duration-300 ${
                  animationPhase === "contract" ? "scale-110" : ""
                }`}
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-xl border-2 ${
                    animationPhase === "contract"
                      ? "border-primary bg-primary/20 animate-pulse"
                      : "border-border bg-secondary"
                  }`}
                >
                  <FileText className="h-8 w-8 text-chart-3" />
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">Smart Contract</p>
                <p className="text-xs text-muted-foreground">Auto-Split</p>
              </div>

              {/* Arrow / Flow Lines to Participants */}
              <div className="flex-1 mx-4 relative">
                {currentParticipants.map((p, i) => (
                  <div
                    key={p.role}
                    className="absolute h-0.5 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: animationPhase === "distribution" ? p.color : "#333",
                      width: animationPhase === "distribution" ? "100%" : "0%",
                      top: `${15 + i * 25}%`,
                      opacity: animationPhase === "distribution" ? 1 : 0.3,
                    }}
                  />
                ))}
              </div>

              {/* Participant Icons */}
              <div className="flex flex-col gap-2">
                {currentParticipants.map((p) => (
                  <div
                    key={p.role}
                    className={`flex items-center gap-2 transition-all duration-300 ${
                      animationPhase === "distribution" && p.amount > 0 ? "scale-105" : ""
                    }`}
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${p.color}20`, borderColor: p.color, borderWidth: "1px" }}
                    >
                      <p.icon className="h-4 w-4" style={{ color: p.color }} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-medium text-foreground">{p.role}</p>
                      <p className="text-xs" style={{ color: p.color }}>
                        {p.percentage}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Participant Cards with Filling Amounts */}
          <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {currentParticipants.map((p) => (
              <div
                key={p.role}
                className="rounded-lg border border-border bg-secondary/50 p-4 text-center transition-all"
                style={{
                  borderColor: p.amount > 0 ? p.color : undefined,
                  boxShadow: p.amount > 0 ? `0 0 20px ${p.color}20` : undefined,
                }}
              >
                <p.icon className="mx-auto h-6 w-6 mb-2" style={{ color: p.color }} />
                <p className="text-xs text-muted-foreground">{p.role}</p>
                <p className="text-xs text-muted-foreground mb-1">{p.percentage}%</p>
                <p className="text-lg font-bold" style={{ color: p.color }}>
                  ${p.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* Summary */}
          {ticketCount === targetTickets && !isSimulating && (
            <div className="mb-6 rounded-lg border border-primary/30 bg-primary/5 p-4">
              <p className="text-sm text-foreground">
                For <span className="font-bold">{targetTickets} tickets</span> at{" "}
                <span className="font-bold">${ticketPrice}</span>, the contract routes{" "}
                <span className="text-primary font-bold">${currentParticipants[0].amount.toLocaleString()}</span> to the
                Artist,{" "}
                <span className="text-chart-3 font-bold">${currentParticipants[1].amount.toLocaleString()}</span> to the
                Venue,{" "}
                <span className="text-amber-500 font-bold">${currentParticipants[2].amount.toLocaleString()}</span> to
                the Promoter, and{" "}
                <span className="text-blue-500 font-bold">${currentParticipants[3].amount.toLocaleString()}</span> to
                the Manager.
              </p>
            </div>
          )}

          <Button
            onClick={startSimulation}
            disabled={isSimulating}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Play className="mr-2 h-4 w-4" />
            {isSimulating ? "Simulating..." : "Simulate 100 Ticket Sales"}
          </Button>
        </>
      ) : (
        /* Settlement History Tab */
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Tickets</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Total</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Artist</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Venue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Promoter</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Manager</th>
              </tr>
            </thead>
            <tbody>
              {settlementHistory.map((row, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-4 py-3 text-foreground">{row.date}</td>
                  <td className="px-4 py-3 text-foreground">{row.tickets}</td>
                  <td className="px-4 py-3 font-medium text-foreground">${row.total.toLocaleString()}</td>
                  <td className="px-4 py-3 text-primary">${row.splits.artist.toLocaleString()}</td>
                  <td className="px-4 py-3 text-chart-3">${row.splits.venue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-amber-500">${row.splits.promoter.toLocaleString()}</td>
                  <td className="px-4 py-3 text-blue-500">${row.splits.manager.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
