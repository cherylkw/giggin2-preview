"use client"

import { useState } from "react"
import { AIBadge } from "@/components/ui/ai-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToolCallPanel } from "@/components/ui/tool-call-panel"
import {
  ArrowLeft,
  Check,
  CreditCard,
  MapPin,
  Shield,
  Ticket,
  Users,
  ChevronRight,
  Smartphone,
  Download,
  PartyPopper,
  QrCode,
  Calendar,
  Clock,
  Wallet,
  Lock,
  CircleDollarSign,
  ExternalLink,
  Info,
} from "lucide-react"
import Link from "next/link"
import { SeatMapModal } from "@/components/ticketing/seat-map-modal"
import { GroupBuyPanel } from "@/components/ticketing/group-buy-panel"
import Image from "next/image"
import { FairAccessNotice } from "@/components/fair-access/fair-access-notice"
import { mockEvents } from "@/lib/mock-data"

const ticketTiers = [
  {
    name: "General Admission",
    price: 45,
    description: "Standing room access to the main floor",
    perks: ["Main floor access", "Standard entry time"],
    available: 847,
  },
  {
    name: "Premium",
    price: 85,
    description: "Enhanced experience with better viewing",
    perks: ["Reserved seating", "Early entry", "Complimentary drink"],
    available: 234,
    popular: true,
  },
  {
    name: "VIP",
    price: 120,
    description: "The ultimate concert experience",
    perks: ["Front section access", "VIP lounge access", "Meet & greet opportunity", "Exclusive merchandise"],
    available: 56,
  },
]

const pricingToolCalls = [
  {
    tool: "mcp.dynamic_pricing",
    status: "completed" as const,
    duration: "156ms",
    result: "Optimized pricing based on 87% demand level",
  },
  {
    tool: "mcp.fraud_detection",
    status: "completed" as const,
    duration: "89ms",
    result: "Transaction verified, no anomalies detected",
  },
  {
    tool: "mcp.inventory_sync",
    status: "completed" as const,
    duration: "67ms",
    result: "Real-time availability confirmed",
  },
]

export default function TicketingPage() {
  const event = mockEvents[0]
  const [isNFT, setIsNFT] = useState(false)
  const [showSeatMap, setShowSeatMap] = useState(false)
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [showGroupBuy, setShowGroupBuy] = useState(false)

  const [checkoutStep, setCheckoutStep] = useState<"select" | "review" | "payment" | "confirmation">("select")
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "usdc" | "moonpay">("stripe")
  const [selectedWallet, setSelectedWallet] = useState<"metamask" | "coinbase" | "walletconnect" | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showMoonPayConfirm, setShowMoonPayConfirm] = useState(false)

  const selectedTicket = ticketTiers.find((t) => t.name === selectedTier)
  const subtotal = selectedTicket ? selectedTicket.price * quantity : 0
  const serviceFee = subtotal * 0.05
  const total = subtotal + serviceFee

  const handleProceedToReview = () => {
    if (selectedTier) {
      setCheckoutStep("review")
    }
  }

  const handleProceedToPayment = () => {
    setCheckoutStep("payment")
  }

  const handleProcessPayment = async () => {
    if (paymentMethod === "usdc" && !selectedWallet) {
      return // Require wallet selection for USDC
    }
    if (paymentMethod === "moonpay") {
      setShowMoonPayConfirm(true)
      return
    }
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2500))
    setIsProcessing(false)
    setCheckoutStep("confirmation")
  }

  const handleMoonPayConfirm = async () => {
    setShowMoonPayConfirm(false)
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsProcessing(false)
    setCheckoutStep("confirmation")
  }

  const handleBackToSelect = () => {
    setCheckoutStep("select")
  }

  if (checkoutStep === "confirmation") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="max-w-lg w-full space-y-8 text-center">
          {/* Success Animation */}
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-primary">
              <Check className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <PartyPopper className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">You&apos;re In!</h1>
              <PartyPopper className="h-6 w-6 text-primary" />
            </div>
            <p className="text-muted-foreground">Your tickets for {event.name} have been confirmed</p>
          </div>

          {/* Ticket Summary Card */}
          <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card text-left">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={event.image || "/placeholder.svg?height=80&width=80&query=concert"}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{event.name}</h3>
                  <p className="text-sm text-muted-foreground">{event.artist}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tickets</span>
                  <span className="text-foreground">
                    {quantity}x {selectedTier}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Order #</span>
                  <span className="text-foreground font-mono">
                    GIG-{Math.random().toString(36).substring(2, 8).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Total Paid</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* QR Code Preview */}
              <div className="flex items-center gap-4 rounded-xl border border-border bg-secondary/50 p-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-white">
                  <QrCode className="h-10 w-10 text-background" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Mobile Ticket Ready</p>
                  <p className="text-sm text-muted-foreground">Show this QR code at entry</p>
                </div>
              </div>

              {isNFT && (
                <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 p-4">
                  <Wallet className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">NFT Collectible Minting</p>
                    <p className="text-sm text-muted-foreground">
                      Your digital collectible will arrive within 24 hours
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
              <Smartphone className="mr-2 h-5 w-5" />
              View in Wallet
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Link href="/fan/pulse" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  Browse More Events
                </Button>
              </Link>
            </div>
          </div>

          {/* AI Tool Calls */}
          <div className="pt-4">
            <ToolCallPanel
              calls={[
                {
                  tool: "mcp.ticket_mint",
                  status: "completed",
                  duration: "234ms",
                  result: "Ticket NFT queued for minting",
                },
                {
                  tool: "mcp.email_confirmation",
                  status: "completed",
                  duration: "89ms",
                  result: "Confirmation sent to user",
                },
                {
                  tool: "mcp.wallet_sync",
                  status: "completed",
                  duration: "156ms",
                  result: "Ticket added to mobile wallet",
                },
              ]}
            />
          </div>
        </div>
      </div>
    )
  }

  if (checkoutStep === "payment") {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setCheckoutStep("review")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payment</h1>
            <p className="text-muted-foreground">Step 3 of 3 - Complete your purchase</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2">
          <div className="h-1 flex-1 rounded-full bg-primary" />
          <div className="h-1 flex-1 rounded-full bg-primary" />
          <div className="h-1 flex-1 rounded-full bg-primary" />
        </div>

        {/* MoonPay Confirmation Modal */}
        {showMoonPayConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <Card className="w-full max-w-md mx-4 border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#7D00FF]">
                    <span className="text-white font-bold text-sm">MP</span>
                  </div>
                  MoonPay Purchase
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  You&apos;ll be redirected to MoonPay to purchase ${total.toFixed(2)} USDC using your card.
                </p>
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                  <p className="text-sm text-foreground">
                    Once purchased, your USDC will automatically be applied to your ticket checkout.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setShowMoonPayConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-[#7D00FF] hover:bg-[#7D00FF]/90 text-white"
                    onClick={handleMoonPayConfirm}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Continue to MoonPay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Fair Access Notice */}
            <FairAccessNotice />

            {/* Payment Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Choose Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Option A: Stripe (Fiat USD) */}
                <div
                  onClick={() => setPaymentMethod("stripe")}
                  className={`rounded-xl border p-5 cursor-pointer transition-all ${
                    paymentMethod === "stripe" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#635BFF] shrink-0">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
                        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">Pay with Stripe (Fiat USD)</p>
                        {paymentMethod === "stripe" && <Check className="h-5 w-5 text-primary" />}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Credit/Debit via Stripe (Visa, Mastercard, Apple Pay, Google Pay)
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Recommended for US and international fiat payments.
                      </p>
                    </div>
                  </div>
                  {paymentMethod === "stripe" && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <Button className="w-full bg-[#635BFF] hover:bg-[#635BFF]/90 text-white" size="lg">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Pay with Stripe (USD)
                      </Button>
                    </div>
                  )}
                </div>

                {/* Option B: USDC (Stablecoin) */}
                <div
                  onClick={() => setPaymentMethod("usdc")}
                  className={`rounded-xl border p-5 cursor-pointer transition-all ${
                    paymentMethod === "usdc" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#2775CA] shrink-0">
                      <CircleDollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">Pay with USDC (Stablecoin)</p>
                        {paymentMethod === "usdc" && <Check className="h-5 w-5 text-primary" />}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">On-chain stablecoin payment</p>

                      {paymentMethod === "usdc" && (
                        <div className="mt-4 space-y-4">
                          {/* Wallet Selector */}
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Select Wallet:</p>
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedWallet("metamask")
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                                  selectedWallet === "metamask"
                                    ? "border-primary bg-primary/10"
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                <div className="w-5 h-5 rounded bg-[#F6851B] flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">M</span>
                                </div>
                                <span className="text-sm text-foreground">MetaMask</span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedWallet("coinbase")
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                                  selectedWallet === "coinbase"
                                    ? "border-primary bg-primary/10"
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                <div className="w-5 h-5 rounded bg-[#0052FF] flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">C</span>
                                </div>
                                <span className="text-sm text-foreground">Coinbase Wallet</span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedWallet("walletconnect")
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                                  selectedWallet === "walletconnect"
                                    ? "border-primary bg-primary/10"
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                <div className="w-5 h-5 rounded bg-[#3B99FC] flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">W</span>
                                </div>
                                <span className="text-sm text-foreground">WalletConnect</span>
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Funds settle into Giggin&apos;s Circle Treasury Wallet. Supported networks: Ethereum,
                            Polygon.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {paymentMethod === "usdc" && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <Button
                        className="w-full bg-[#2775CA] hover:bg-[#2775CA]/90 text-white"
                        size="lg"
                        disabled={!selectedWallet}
                      >
                        <Wallet className="mr-2 h-5 w-5" />
                        Pay with USDC
                      </Button>
                    </div>
                  )}
                </div>

                {/* Option C: MoonPay (Card → Crypto On-Ramp) */}
                <div
                  onClick={() => setPaymentMethod("moonpay")}
                  className={`rounded-xl border p-5 cursor-pointer transition-all ${
                    paymentMethod === "moonpay"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#7D00FF] shrink-0">
                      <span className="text-white font-bold text-lg">MP</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">Buy USDC with MoonPay (Card → Crypto On-Ramp)</p>
                        {paymentMethod === "moonpay" && <Check className="h-5 w-5 text-primary" />}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Use your Visa / Mastercard to instantly purchase USDC and complete ticket payment.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Best for fans who don&apos;t hold crypto yet.
                      </p>
                    </div>
                  </div>
                  {paymentMethod === "moonpay" && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <Button className="w-full bg-[#7D00FF] hover:bg-[#7D00FF]/90 text-white" size="lg">
                        <ExternalLink className="mr-2 h-5 w-5" />
                        Buy USDC with MoonPay
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment Information Footer */}
            <Card className="border-muted">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">Payment Information</p>
                    <ul className="space-y-1">
                      <li>Stripe handles all fiat payments.</li>
                      <li>USDC payments are routed through Circle and support programmable royalty splits.</li>
                      <li>MoonPay enables card purchases of USDC for fans who don&apos;t have crypto wallets.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-sm">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={event.image || "/placeholder.svg?height=64&width=64&query=concert"}
                      alt={event.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{event.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {quantity}x {selectedTier}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} •{" "}
                      {event.time}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="text-foreground">${serviceFee.toFixed(2)}</span>
                  </div>
                  {isNFT && (
                    <div className="flex justify-between text-sm">
                      <span className="text-primary">NFT Collectible</span>
                      <span className="text-primary">Included</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold pt-2 border-t border-border">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
              onClick={handleProcessPayment}
              disabled={isProcessing || (paymentMethod === "usdc" && !selectedWallet)}
            >
              {isProcessing ? (
                <>
                  <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-5 w-5" />
                  Pay ${total.toFixed(2)}
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>
                {paymentMethod === "stripe" && "Secured by Stripe"}
                {paymentMethod === "usdc" && "Secured by Circle"}
                {paymentMethod === "moonpay" && "Secured by MoonPay"}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (checkoutStep === "review") {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBackToSelect}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Review Order</h1>
            <p className="text-muted-foreground">Step 2 of 3 - Confirm your selection</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2">
          <div className="h-1 flex-1 rounded-full bg-primary" />
          <div className="h-1 flex-1 rounded-full bg-primary" />
          <div className="h-1 flex-1 rounded-full bg-muted" />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5 text-primary" />
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={event.image || "/placeholder.svg?height=96&width=96&query=concert"}
                      alt={event.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">{event.name}</h3>
                    <p className="text-muted-foreground">{event.artist}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {event.venue}, {event.city}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Selection Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Your Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-primary/30 bg-primary/5">
                  <div>
                    <h4 className="font-semibold text-foreground">{selectedTier}</h4>
                    <p className="text-sm text-muted-foreground">{selectedTicket?.description}</p>
                    <ul className="flex flex-wrap gap-2 mt-2">
                      {selectedTicket?.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Check className="h-3 w-3 text-primary" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">${selectedTicket?.price}</p>
                    <p className="text-sm text-muted-foreground">x {quantity}</p>
                  </div>
                </div>

                <Button variant="outline" onClick={handleBackToSelect} className="w-full bg-transparent">
                  Change Selection
                </Button>
              </CardContent>
            </Card>

            {/* NFT Option */}
            {isNFT && (
              <Card className="border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                      <Wallet className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">NFT Collectible Included</h4>
                      <p className="text-sm text-muted-foreground">
                        Your ticket will be minted as a digital collectible on the blockchain
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {quantity}x {selectedTier}
                  </span>
                  <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Service Fee (5%)</span>
                  <span className="text-muted-foreground">${serviceFee.toFixed(2)}</span>
                </div>
                {isNFT && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary">NFT Collectible</span>
                    <span className="text-primary">Included</span>
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
                </div>

                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                  onClick={handleProceedToPayment}
                >
                  Continue to Payment
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secure checkout</span>
                </div>
              </CardContent>
            </Card>

            <ToolCallPanel calls={pricingToolCalls} />
          </div>
        </div>
      </div>
    )
  }

  // Select tickets step (default)
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/fan/events/${event.id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-foreground">Smart Ticketing</h1>
            <AIBadge text="AI-Powered Pricing" />
          </div>
          <p className="text-muted-foreground">Step 1 of 3 - Select your tickets</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-2">
        <div className="h-1 flex-1 rounded-full bg-primary" />
        <div className="h-1 flex-1 rounded-full bg-muted" />
        <div className="h-1 flex-1 rounded-full bg-muted" />
      </div>

      {/* Event Summary */}
      <Card className="border-primary/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20">
                <Ticket className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">{event.name}</h2>
                <p className="text-muted-foreground">{event.artist}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>
                  {event.venue}, {event.city}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}{" "}
                • {event.time}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Ticket Selection */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-semibold text-foreground">Select Your Tickets</h3>

          <Button variant="outline" onClick={() => setShowSeatMap(true)} className="w-full">
            <MapPin className="mr-2 h-4 w-4" />
            View Seat Map
          </Button>

          <div className="space-y-4">
            {ticketTiers.map((tier) => (
              <Card
                key={tier.name}
                onClick={() => setSelectedTier(tier.name)}
                className={`cursor-pointer transition-all hover:border-primary/50 ${
                  selectedTier === tier.name ? "border-primary bg-primary/5" : ""
                } ${tier.popular ? "border-primary/50 bg-primary/5" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-semibold text-foreground">{tier.name}</h4>
                        {tier.popular && (
                          <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                            Most Popular
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>
                      <ul className="mt-3 space-y-1">
                        {tier.perks.map((perk) => (
                          <li key={perk} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-primary" />
                            {perk}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        {tier.available} tickets remaining
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">${tier.price}</p>
                      <p className="text-xs text-muted-foreground">per ticket</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div
            onClick={() => setShowGroupBuy(!showGroupBuy)}
            className={`relative rounded-xl border p-4 cursor-pointer transition-all ${
              showGroupBuy ? "border-green-500 bg-green-500/5" : "border-border hover:border-green-500/50"
            }`}
          >
            <div className="absolute -top-2 left-4">
              <span className="bg-green-500 text-black text-xs px-2 py-0.5 rounded-full font-medium">
                Save Together
              </span>
            </div>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-400" />
                  <h3 className="font-semibold text-foreground">Group Buy Ticket</h3>
                  {showGroupBuy && <Check className="h-4 w-4 text-green-400" />}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Save up to 25% by buying tickets together with friends
                </p>
                <p className="text-xs text-green-400 mt-2">Group size: 3-8 people required</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-400">$34 - $90</p>
                <p className="text-xs text-muted-foreground">25% off</p>
              </div>
            </div>
          </div>

          {showGroupBuy && selectedTier && (
            <GroupBuyPanel
              eventId={event.id}
              ticketTier={selectedTier}
              originalPrice={ticketTiers.find((t) => t.name === selectedTier)?.price || 0}
              onClose={() => setShowGroupBuy(false)}
            />
          )}
        </div>

        {/* Sidebar - Order Summary */}
        <div className="space-y-6">
          <Card className="border-primary/30 sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedTier ? (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {quantity}x {selectedTier}
                      </span>
                      <span className="text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span className="text-foreground">${serviceFee.toFixed(2)}</span>
                    </div>
                    {isNFT && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">NFT Collectible</span>
                        <span className="text-green-400">Included</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between font-semibold">
                      <span className="text-foreground">Total</span>
                      <span className="text-primary text-xl">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-primary text-primary-foreground"
                    size="lg"
                    onClick={handleProceedToReview}
                    disabled={showGroupBuy}
                  >
                    {showGroupBuy ? "Use Group Buy Options Above" : "Proceed to Checkout"}
                    {!showGroupBuy && <ChevronRight className="ml-2 h-4 w-4" />}
                  </Button>
                </>
              ) : (
                <p className="text-muted-foreground text-center py-4">Select a ticket type to continue</p>
              )}

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <span>Secure checkout powered by Giggin&apos;</span>
              </div>
            </CardContent>
          </Card>

          {/* AI Pricing Insights */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">AI Pricing Insights</CardTitle>
                <AIBadge text="Live" />
              </div>
            </CardHeader>
            <CardContent>
              <ToolCallPanel
                calls={[
                  {
                    tool: "mcp.dynamic_pricing",
                    status: "completed",
                    duration: "156ms",
                    result: "Optimized pricing based on 87% demand level",
                  },
                  {
                    tool: "mcp.fraud_detection",
                    status: "completed",
                    duration: "89ms",
                    result: "Transaction verified, no anomalies detected",
                  },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <SeatMapModal isOpen={showSeatMap} onClose={() => setShowSeatMap(false)} venueType="club" />
    </div>
  )
}
