"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Users, Clock, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockGroupBuys } from "@/lib/mock-data"

interface GroupBuyPanelProps {
  eventId: string
  ticketTier: string
  originalPrice: number
  onClose?: () => void
}

export function GroupBuyPanel({ eventId, ticketTier, originalPrice, onClose }: GroupBuyPanelProps) {
  const [mode, setMode] = useState<"select" | "join">("select")
  const [joinCode, setJoinCode] = useState("")
  const [joinError, setJoinError] = useState("")

  const existingGroup = mockGroupBuys.find(
    (gb) => gb.eventId === eventId && gb.ticketTier === ticketTier && gb.status === "active",
  )

  const groupPrice = Math.round(originalPrice * 0.75) // 25% discount
  const savings = originalPrice - groupPrice

  const handleJoin = () => {
    const group = mockGroupBuys.find((gb) => gb.joinCode === joinCode.toUpperCase())
    if (group) {
      // Redirect to group buy room
      window.location.href = `/fan/group-buy/${group.id}`
    } else {
      setJoinError("Invalid code. Please check and try again.")
    }
  }

  if (mode === "join") {
    return (
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Join a Group Buy</h3>
            <Button variant="ghost" size="sm" onClick={() => setMode("select")}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Enter the join code shared by your friend to join their group.
          </p>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Enter join code (e.g. NEON2025)"
              value={joinCode}
              onChange={(e) => {
                setJoinCode(e.target.value.toUpperCase())
                setJoinError("")
              }}
              className="w-full bg-secondary rounded-lg px-4 py-3 text-foreground font-mono text-center text-lg uppercase placeholder:text-muted-foreground placeholder:normal-case placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {joinError && <p className="text-sm text-red-400">{joinError}</p>}
          </div>

          <Button
            className="w-full bg-primary text-primary-foreground"
            onClick={handleJoin}
            disabled={!joinCode.trim()}
          >
            Join Group
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Group Buy</h3>
          </div>
          <Badge className="bg-green-500/20 text-green-400">Save ${savings}</Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          Save money by buying tickets together! Create a group or join an existing one.
        </p>

        <div className="p-3 rounded-lg bg-secondary/50 border border-border">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Group price</span>
            <span className="text-foreground font-bold">${groupPrice}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">vs. ${originalPrice} individual</span>
            <span className="text-green-400">25% off</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Group size: 3–8 people required</p>
        </div>

        {existingGroup && (
          <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-foreground">Active group found!</span>
            </div>
            <div className="flex items-center gap-2">
              {existingGroup.members.slice(0, 3).map((member) => (
                <Image
                  key={member.id}
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ))}
              <span className="text-xs text-muted-foreground">
                {existingGroup.currentSize}/{existingGroup.minSize} joined
              </span>
            </div>
            <Link href={`/fan/group-buy/${existingGroup.id}`}>
              <Button size="sm" className="w-full mt-3 bg-amber-500 text-black hover:bg-amber-400">
                Join This Group
              </Button>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Link href={`/fan/group-buy/new?eventId=${eventId}&tier=${ticketTier}`}>
            <Button variant="outline" className="w-full bg-transparent">
              Start a Group
            </Button>
          </Link>
          <Button variant="outline" className="w-full bg-transparent" onClick={() => setMode("join")}>
            Join a Group
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
