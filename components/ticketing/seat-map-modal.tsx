"use client"

import { useState } from "react"
import { X, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

type VenueLayout = "stadium" | "club" | "theater"

interface Seat {
  id: string
  section: string
  row: string
  number: string
  price: number
  available: boolean
}

interface SeatMapModalProps {
  isOpen: boolean
  onClose: () => void
  layout?: VenueLayout
  venueType?: VenueLayout
  onSelectSeats?: (seats: Seat[]) => void
}

const layoutConfigs = {
  stadium: {
    name: "Stadium",
    sections: [
      { id: "floor", name: "Floor", color: "#B96CFF", price: 150, rows: 10, seatsPerRow: 20 },
      { id: "lower", name: "Lower Bowl", color: "#22c55e", price: 95, rows: 8, seatsPerRow: 30 },
      { id: "upper", name: "Upper Bowl", color: "#3b82f6", price: 55, rows: 6, seatsPerRow: 40 },
    ],
  },
  club: {
    name: "Club",
    sections: [
      { id: "vip-tables", name: "VIP Tables", color: "#B96CFF", price: 200, rows: 2, seatsPerRow: 8 },
      { id: "standing", name: "Standing Area", color: "#22c55e", price: 45, rows: 1, seatsPerRow: 100 },
      { id: "booths", name: "Booths", color: "#f59e0b", price: 120, rows: 2, seatsPerRow: 6 },
    ],
  },
  theater: {
    name: "Theater",
    sections: [
      { id: "orchestra", name: "Orchestra", color: "#B96CFF", price: 175, rows: 12, seatsPerRow: 25 },
      { id: "mezzanine", name: "Mezzanine", color: "#22c55e", price: 125, rows: 6, seatsPerRow: 30 },
      { id: "balcony", name: "Balcony", color: "#3b82f6", price: 75, rows: 5, seatsPerRow: 35 },
    ],
  },
}

export function SeatMapModal({ isOpen, onClose, layout, venueType, onSelectSeats }: SeatMapModalProps) {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  const effectiveLayout = layout || venueType || "stadium"
  const config = layoutConfigs[effectiveLayout]

  const toggleSeat = (seat: Seat) => {
    if (!seat.available) return
    setSelectedSeats((prev) =>
      prev.find((s) => s.id === seat.id) ? prev.filter((s) => s.id !== seat.id) : [...prev, seat],
    )
  }

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-2 text-xl font-bold text-foreground">{config.name} Seat Map</h2>
        <p className="mb-6 text-sm text-muted-foreground">Click seats to select. Hover over sections for details.</p>

        {/* Seat Map Visualization */}
        <div className="mb-6 rounded-xl border border-border bg-secondary/30 p-8">
          {/* Stage */}
          <div className="mx-auto mb-8 w-2/3 rounded-lg bg-primary/30 py-3 text-center text-sm font-medium text-primary">
            STAGE
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {config.sections.map((section) => (
              <div
                key={section.id}
                className="relative"
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{section.name}</span>
                  <span className="text-sm text-muted-foreground">${section.price}</span>
                </div>

                {/* Seat Grid */}
                <div
                  className="flex flex-wrap justify-center gap-1 rounded-lg p-3 transition-all"
                  style={{
                    backgroundColor: `${section.color}15`,
                    borderColor: hoveredSection === section.id ? section.color : "transparent",
                    borderWidth: "2px",
                  }}
                >
                  {Array.from({ length: Math.min(section.rows * section.seatsPerRow, 60) }).map((_, i) => {
                    const row = Math.floor(i / 10) + 1
                    const seatNum = (i % 10) + 1
                    const seatId = `${section.id}-${row}-${seatNum}`
                    const available = Math.random() > 0.2
                    const seat: Seat = {
                      id: seatId,
                      section: section.name,
                      row: `Row ${row}`,
                      number: `Seat ${seatNum}`,
                      price: section.price,
                      available,
                    }
                    const isSelected = selectedSeats.find((s) => s.id === seatId)

                    return (
                      <button
                        key={seatId}
                        onClick={() => toggleSeat(seat)}
                        disabled={!available}
                        className={`h-4 w-4 rounded-sm transition-all ${
                          isSelected
                            ? "bg-primary ring-2 ring-primary ring-offset-1 ring-offset-background"
                            : available
                              ? "hover:scale-110"
                              : "cursor-not-allowed opacity-30"
                        }`}
                        style={{
                          backgroundColor: isSelected ? "#B96CFF" : available ? section.color : "#666",
                        }}
                        title={`${section.name} - Row ${row}, Seat ${seatNum} - $${section.price}`}
                      />
                    )
                  })}
                </div>

                {/* Tooltip */}
                {hoveredSection === section.id && (
                  <div className="absolute -right-2 top-0 z-10 rounded-lg border border-border bg-card p-3 shadow-lg">
                    <p className="font-medium text-foreground">{section.name}</p>
                    <p className="text-sm text-muted-foreground">${section.price} per seat</p>
                    <p className="text-xs text-primary">{section.rows * section.seatsPerRow} total seats</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mb-6 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-sm bg-primary" />
            <span className="text-muted-foreground">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-sm bg-chart-3" />
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-sm bg-muted opacity-30" />
            <span className="text-muted-foreground">Sold</span>
          </div>
        </div>

        {/* Selection Summary */}
        <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
          <div>
            <p className="font-medium text-foreground">{selectedSeats.length} seats selected</p>
            {selectedSeats.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {selectedSeats
                  .map((s) => s.section)
                  .filter((v, i, a) => a.indexOf(v) === i)
                  .join(", ")}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">${totalPrice.toFixed(2)}</p>
              <Button
                onClick={() => {
                  onSelectSeats?.(selectedSeats)
                  onClose()
                }}
                disabled={selectedSeats.length === 0}
                className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Confirm Selection
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          <Info className="mr-1 inline h-3 w-3" />
          Seat availability shown is simulated for prototype purposes
        </p>
      </div>
    </div>
  )
}
