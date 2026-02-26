"use client"

import { useState } from "react"
import {
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  ChevronRight,
  Check,
  MapPin,
  Building,
  Music,
  Theater,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AIBadge } from "@/components/ui/ai-badge"
import { StatCard } from "@/components/ui/stat-card"
import { ToolCallPanel } from "@/components/ui/tool-call-panel"
import { mockToolCalls } from "@/lib/mock-data"
import { SeatMapModal } from "@/components/ticketing/seat-map-modal"
import { DynamicPricingPanel } from "@/components/ticketing/dynamic-pricing-panel"
import { AntiScalperSignals } from "@/components/fair-access/anti-scalper-signals"

const pricingTiers = [
  { name: "Early Bird", price: 45, allocation: 500, projected: 487 },
  { name: "General Admission", price: 75, allocation: 2000, projected: 1850 },
  { name: "VIP", price: 150, allocation: 300, projected: 245 },
]

const wizardSteps = [
  { id: 1, name: "Event Info", completed: true },
  { id: 2, name: "Choose Venue Layout", completed: true }, // New step
  { id: 3, name: "Pricing Strategy", completed: true },
  { id: 4, name: "Auto-Split", completed: false, current: true },
  { id: 5, name: "Settlement", completed: false },
  { id: 6, name: "Preview Contract", completed: false },
  { id: 7, name: "Activate", completed: false },
]

const venueLayouts = [
  {
    id: "stadium",
    name: "Stadium Layout",
    description: "Multi-ring sections: Floor, Lower Bowl, Upper Bowl. Numbered sections with color-coded zones.",
    capacity: "10,000+",
  },
  {
    id: "club",
    name: "Club Layout",
    description: "Small stage, standing area, VIP tables and booths around the floor.",
    capacity: "500-2,000",
  },
  {
    id: "theater",
    name: "Theater Layout",
    description: "Orchestra, Mezzanine, and Balcony seating with numbered rows.",
    capacity: "1,000-5,000",
  },
]

export default function SmartTicketingPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "wizard">("overview")
  const [selectedLayout, setSelectedLayout] = useState<"stadium" | "club" | "theater">("stadium")
  const [showSeatMap, setShowSeatMap] = useState(false)
  const [currentStep, setCurrentStep] = useState(4)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Smart Ticketing</h1>
          <p className="mt-2 text-muted-foreground">AI-powered event pricing intelligence and ticket management</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant={activeTab === "overview" ? "default" : "outline"}
            onClick={() => setActiveTab("overview")}
            className={activeTab === "overview" ? "bg-primary text-primary-foreground" : ""}
          >
            Pricing Overview
          </Button>
          <Button
            variant={activeTab === "wizard" ? "default" : "outline"}
            onClick={() => setActiveTab("wizard")}
            className={activeTab === "wizard" ? "bg-primary text-primary-foreground" : ""}
          >
            Setup Wizard
          </Button>
        </div>
      </div>

      {activeTab === "overview" ? (
        <>
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Suggested Price Range"
              value="$45 - $150"
              icon={DollarSign}
              description="AI optimized based on demand"
            />
            <StatCard
              title="Projected Attendance"
              value="2,582"
              change="+12% from last event"
              changeType="positive"
              icon={Users}
            />
            <StatCard
              title="Demand Score"
              value="87/100"
              change="High demand detected"
              changeType="positive"
              icon={TrendingUp}
            />
            <StatCard
              title="Revenue Forecast"
              value="$193,650"
              icon={BarChart3}
              description="Based on current projections"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Pricing and Heatmap */}
            <div className="lg:col-span-2 space-y-6">
              <DynamicPricingPanel />

              {/* Demand Heatmap */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Demand Heatmap</h2>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 28 }).map((_, i) => {
                    const intensity = Math.random()
                    return (
                      <div
                        key={i}
                        className="aspect-square rounded-md"
                        style={{
                          backgroundColor: `rgba(185, 108, 255, ${0.2 + intensity * 0.8})`,
                        }}
                      />
                    )
                  })}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Low interest</span>
                  <div className="flex items-center gap-1">
                    {[0.2, 0.4, 0.6, 0.8, 1].map((opacity) => (
                      <div
                        key={opacity}
                        className="h-3 w-6 rounded"
                        style={{ backgroundColor: `rgba(185, 108, 255, ${opacity})` }}
                      />
                    ))}
                  </div>
                  <span>High interest</span>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Venue Seat Map</h2>
                  <span className="text-sm text-muted-foreground capitalize">{selectedLayout} Layout</span>
                </div>
                <Button onClick={() => setShowSeatMap(true)} variant="outline" className="w-full">
                  <MapPin className="mr-2 h-4 w-4" />
                  Open Interactive Seat Map
                </Button>
              </div>
            </div>

            {/* Right Column - AI Tools, Anti Scalper, and Competitor Analysis */}
            <div className="space-y-6">
              <ToolCallPanel
                calls={mockToolCalls.map((t) => ({ ...t, status: "completed" as const }))}
                title="AI Agent Tools"
              />

              <AntiScalperSignals />

              {/* Competitor Analysis */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Competitor Events</h2>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border bg-secondary/50 p-3">
                    <p className="font-medium text-foreground">Electronic Nights</p>
                    <p className="text-sm text-muted-foreground">Same date - $55-$120</p>
                    <p className="text-xs text-chart-4">Medium competition</p>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/50 p-3">
                    <p className="font-medium text-foreground">Jazz Weekend</p>
                    <p className="text-sm text-muted-foreground">+1 day - $40-$90</p>
                    <p className="text-xs text-chart-3">Low competition</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                <p className="text-xs text-muted-foreground">
                  Powered by Giggin&apos;s Reasoning Engine + Taste Graph AI
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Setup Wizard */
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Steps Sidebar */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-4 font-semibold text-foreground">Setup Steps</h3>
            <div className="space-y-2">
              {wizardSteps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex w-full items-center gap-3 rounded-lg p-3 transition-colors ${
                    currentStep === step.id
                      ? "bg-primary/20 border border-primary/30"
                      : step.id < currentStep
                        ? "bg-chart-3/10"
                        : "bg-secondary/50"
                  }`}
                >
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                      step.id < currentStep
                        ? "bg-chart-3 text-background"
                        : currentStep === step.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.id < currentStep ? <Check className="h-3 w-3" /> : step.id}
                  </div>
                  <span
                    className={`text-sm ${
                      currentStep === step.id || step.id < currentStep ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <div className="lg:col-span-3 rounded-xl border border-border bg-card p-6">
            {currentStep === 2 && (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Choose Venue Layout</h2>
                  <p className="text-muted-foreground">Select the seating arrangement for your event</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {venueLayouts.map((layout) => (
                    <button
                      key={layout.id}
                      onClick={() => setSelectedLayout(layout.id as "stadium" | "club" | "theater")}
                      className={`rounded-xl border-2 p-6 text-left transition-all ${
                        selectedLayout === layout.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                        {layout.id === "stadium" && <Building className="h-6 w-6 text-primary" />}
                        {layout.id === "club" && <Music className="h-6 w-6 text-primary" />}
                        {layout.id === "theater" && <Theater className="h-6 w-6 text-primary" />}
                      </div>
                      <h3 className="font-semibold text-foreground">{layout.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{layout.description}</p>
                      <p className="mt-2 text-xs text-primary">Capacity: {layout.capacity}</p>
                      {selectedLayout === layout.id && (
                        <div className="mt-3 flex items-center gap-1 text-primary">
                          <Check className="h-4 w-4" />
                          <span className="text-sm font-medium">Selected</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <Button onClick={() => setShowSeatMap(true)} variant="outline" className="mt-6">
                  Preview Seat Map
                </Button>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Continue to Pricing
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}

            {/* Auto-Split Step (existing) */}
            {currentStep === 4 && (
              <>
                <div className="mb-6">
                  <AIBadge text="AI Suggests 3 Tiers" />
                  <h2 className="mt-2 text-xl font-semibold text-foreground">Auto-Split Configuration</h2>
                  <p className="text-muted-foreground">Configure revenue distribution between participants</p>
                </div>

                {/* Split Sliders */}
                <div className="space-y-6">
                  {[
                    { role: "Artist", percentage: 60, color: "bg-primary" },
                    { role: "Venue", percentage: 25, color: "bg-chart-3" },
                    { role: "Promoter", percentage: 10, color: "bg-accent" },
                    { role: "Manager", percentage: 5, color: "bg-chart-4" },
                  ].map((item) => (
                    <div key={item.role} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{item.role}</span>
                        <span className="text-sm font-bold text-foreground">{item.percentage}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-secondary">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Preview Calculation */}
                <div className="mt-8 rounded-lg border border-border bg-secondary/50 p-4">
                  <h3 className="mb-3 font-medium text-foreground">Preview: 100 Ticket Sales @ $75</h3>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    <div className="rounded-lg bg-card p-3 text-center">
                      <p className="text-xs text-muted-foreground">Artist</p>
                      <p className="text-lg font-bold text-primary">$4,500</p>
                    </div>
                    <div className="rounded-lg bg-card p-3 text-center">
                      <p className="text-xs text-muted-foreground">Venue</p>
                      <p className="text-lg font-bold text-chart-3">$1,875</p>
                    </div>
                    <div className="rounded-lg bg-card p-3 text-center">
                      <p className="text-xs text-muted-foreground">Promoter</p>
                      <p className="text-lg font-bold text-accent">$750</p>
                    </div>
                    <div className="rounded-lg bg-card p-3 text-center">
                      <p className="text-xs text-muted-foreground">Manager</p>
                      <p className="text-lg font-bold text-chart-4">$375</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(5)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Continue to Settlement
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}

            {/* Other steps placeholder */}
            {(currentStep === 1 ||
              currentStep === 3 ||
              currentStep === 5 ||
              currentStep === 6 ||
              currentStep === 7) && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Step {currentStep}: {wizardSteps[currentStep - 1]?.name}
                </p>
                <p className="text-sm text-muted-foreground mt-2">Navigate using the sidebar or buttons below</p>
                <div className="mt-6 flex justify-center gap-4">
                  {currentStep > 1 && (
                    <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                      Back
                    </Button>
                  )}
                  {currentStep < 7 && (
                    <Button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <SeatMapModal
        isOpen={showSeatMap}
        onClose={() => setShowSeatMap(false)}
        layout={selectedLayout}
        onSelectSeats={(seats) => console.log("Selected seats:", seats)}
      />
    </div>
  )
}
