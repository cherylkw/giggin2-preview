"use client"

import { useState } from "react"
import { Sparkles, Upload, Info, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AIBadge } from "@/components/ui/ai-badge"
import Image from "next/image"

interface NFTTicketToggleProps {
  onToggle: (isNFT: boolean) => void
  isNFT: boolean
  mode?: "fan" | "creator" // fan = simplified, creator = full controls
  artistArtwork?: string | null // artwork uploaded by artist (shown to fans)
  artistNetwork?: string // network selected by artist
}

const chainOptions = [
  { id: "ethereum", name: "Ethereum", icon: "⟠" },
  { id: "polygon", name: "Polygon", icon: "⬡" },
]

export function NFTTicketToggle({
  onToggle,
  isNFT,
  mode = "fan",
  artistArtwork = "/concert-collectible-ticket-artwork-neon.jpg",
  artistNetwork = "polygon",
}: NFTTicketToggleProps) {
  const [selectedChain, setSelectedChain] = useState("polygon")
  const [artworkPreview, setArtworkPreview] = useState<string | null>(null)

  if (mode === "fan") {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Ticket Type</h3>
          </div>
          <AIBadge text="Collectible Option" />
        </div>

        <p className="mb-4 text-sm text-muted-foreground">Choose your ticket type</p>

        {/* Toggle */}
        <div className="mb-4 flex gap-4">
          <button
            onClick={() => onToggle(false)}
            className={`flex-1 rounded-xl border-2 p-4 text-left transition-all ${
              !isNFT ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
            }`}
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <svg
                className="h-5 w-5 text-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M7 8h10M7 12h6" />
              </svg>
            </div>
            <p className="font-medium text-foreground">Standard Ticket</p>
            <p className="mt-1 text-xs text-muted-foreground">QR code-based digital ticket</p>
          </button>

          <button
            onClick={() => onToggle(true)}
            className={`flex-1 rounded-xl border-2 p-4 text-left transition-all ${
              isNFT ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
            }`}
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <p className="font-medium text-foreground">Collectible NFT</p>
            <p className="mt-1 text-xs text-muted-foreground">Digital collectible + ticket</p>
          </button>
        </div>

        {/* NFT Preview Card for Fans - Read-only display */}
        {isNFT && <NFTTicketPreviewCard artwork={artistArtwork} network={artistNetwork} />}
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Collectible Ticket Options</h3>
        </div>
        <AIBadge text="NFT Ticketing" />
      </div>

      <p className="mb-4 text-sm text-muted-foreground">Enable digital collectible tickets for your fans</p>

      {/* Toggle */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => onToggle(false)}
          className={`flex-1 rounded-xl border-2 p-4 text-left transition-all ${
            !isNFT ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
          }`}
        >
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
            <svg
              className="h-5 w-5 text-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M7 8h10M7 12h6" />
            </svg>
          </div>
          <p className="font-medium text-foreground">Standard Tickets Only</p>
          <p className="mt-1 text-xs text-muted-foreground">QR code-based digital tickets</p>
        </button>

        <button
          onClick={() => onToggle(true)}
          className={`flex-1 rounded-xl border-2 p-4 text-left transition-all ${
            isNFT ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
          }`}
        >
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <p className="font-medium text-foreground">Enable Collectible NFT</p>
          <p className="mt-1 text-xs text-muted-foreground">Fans can choose collectible option</p>
        </button>
      </div>

      {/* Creator NFT Options */}
      {isNFT && (
        <div className="space-y-6 rounded-lg border border-primary/30 bg-primary/5 p-4">
          <div>
            <h4 className="mb-3 text-sm font-medium text-foreground">Collectible Design</h4>

            {/* Artwork Upload */}
            <div className="mb-4">
              <label className="mb-2 block text-xs text-muted-foreground">Upload Artwork for Collectible</label>
              <div
                className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                  artworkPreview ? "border-primary" : "border-border hover:border-primary/50"
                }`}
              >
                {artworkPreview ? (
                  <div className="relative">
                    <Image
                      src={artworkPreview || "/placeholder.svg"}
                      alt="Preview"
                      width={128}
                      height={128}
                      className="h-32 w-32 rounded-lg object-cover"
                    />
                    <button
                      onClick={() => setArtworkPreview(null)}
                      className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Upload poster artwork</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 bg-transparent"
                      onClick={() => setArtworkPreview("/concert-collectible-ticket-artwork-neon.jpg")}
                    >
                      Select File
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Chain Selection */}
            <div>
              <label className="mb-2 block text-xs text-muted-foreground">Blockchain Network</label>
              <div className="flex gap-2">
                {chainOptions.map((chain) => (
                  <button
                    key={chain.id}
                    onClick={() => setSelectedChain(chain.id)}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors ${
                      selectedChain === chain.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{chain.icon}</span>
                    {chain.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="rounded-lg bg-secondary/50 p-3">
            <p className="text-sm text-muted-foreground">
              <Sparkles className="mr-1 inline h-4 w-4 text-primary" />
              Fans will be able to choose this collectible version when purchasing tickets. This is a visual demo – on
              mainnet this would mint an NFT.
            </p>
          </div>
        </div>
      )}

      <p className="mt-4 text-center text-xs text-muted-foreground">
        <Info className="mr-1 inline h-3 w-3" />
        This is a visual/conceptual feature for prototype purposes
      </p>
    </div>
  )
}

export function NFTTicketPreviewCard({
  artwork,
  network = "polygon",
}: {
  artwork?: string | null
  network?: string
}) {
  const networkDisplay = network === "ethereum" ? { name: "Ethereum", icon: "⟠" } : { name: "Polygon", icon: "⬡" }

  return (
    <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-4">
      <div className="flex gap-4">
        {/* Artwork Thumbnail */}
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-primary/20">
          <Image
            src={artwork || "/placeholder.svg?height=96&width=96&query=concert collectible ticket"}
            alt="Collectible artwork"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <Sparkles className="absolute bottom-1 right-1 h-4 w-4 text-primary" />
        </div>

        {/* Details */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium text-foreground">Includes collectible digital ticket</p>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <span>{networkDisplay.icon}</span>
            <span>{networkDisplay.name} Network</span>
          </div>

          <p className="text-xs text-muted-foreground">This collectible is issued by the event creator</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground border-t border-border/50 pt-3">
        <Info className="mr-1 inline h-3 w-3" />
        Visual demo – on mainnet this would be an NFT or on-chain collectible
      </p>
    </div>
  )
}

export function NFTTicketConfirmation({ isNFT }: { isNFT: boolean }) {
  if (!isNFT) return null

  return (
    <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/20 via-card to-card p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/20">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">Your Digital Collectible</h3>
          <p className="mt-1 text-sm text-muted-foreground">This ticket includes a commemorative digital collectible</p>
          <Button variant="outline" size="sm" className="mt-3 bg-transparent">
            <ExternalLink className="mr-2 h-3 w-3" />
            View Your Collectible
          </Button>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        This is a visual demo – on mainnet this would be an NFT or on-chain collectible.
      </p>
    </div>
  )
}
