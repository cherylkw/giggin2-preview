"use client"

import { useState } from "react"
import { Check, CreditCard, MapPin, Shield, Ticket, Users, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const promoData = {
  promoterName: "LiveNation Pro",
  eventName: "Neon Dreams Live",
  artist: "Neon Dreams",
  venue: "The Warehouse",
  city: "Los Angeles",
  date: "Feb 15, 2024",
  time: "8:00 PM",
  promoCode: "PROMO2024",
  discount: 10,
}

const ticketTiers = [
  {
    id: "ga",
    name: "General Admission",
    price: 65,
    promoPrice: 58.5,
    description: "Standing room access",
    available: 234,
  },
  {
    id: "premium",
    name: "Premium",
    price: 95,
    promoPrice: 85.5,
    description: "Reserved seating with early entry",
    available: 89,
    popular: true,
  },
]

export default function PromoCheckoutPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  const selectedTicket = ticketTiers.find((t) => t.id === selectedTier)
  const subtotal = selectedTicket ? selectedTicket.promoPrice * quantity : 0
  const serviceFee = subtotal * 0.05
  const promoterCommission = selectedTicket ? selectedTicket.price * 0.1 * quantity : 0
  const total = subtotal + serviceFee

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl">
        {/* Promo Banner */}
        <div className="mb-6 rounded-xl border border-primary/30 bg-primary/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Tag className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">
                  Promo code <span className="text-primary">{promoData.promoCode}</span> applied!
                </p>
                <p className="text-sm text-muted-foreground">
                  This ticket was sold via <span className="text-primary">{promoData.promoterName}</span>
                </p>
              </div>
            </div>
            <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
              {promoData.discount}% OFF
            </span>
          </div>
        </div>

        {/* Event Summary */}
        <Card className="mb-6 border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20">
                  <Ticket className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">{promoData.eventName}</h1>
                  <p className="text-muted-foreground">{promoData.artist}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {promoData.venue}, {promoData.city}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {promoData.date} - {promoData.time}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Ticket Selection */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Select Your Tickets</h2>
            <div className="space-y-4">
              {ticketTiers.map((tier) => (
                <Card
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`cursor-pointer transition-all hover:border-primary/50 ${
                    selectedTier === tier.id ? "border-primary bg-primary/5" : ""
                  } ${tier.popular ? "border-primary/30" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                          {tier.popular && (
                            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                              Most Popular
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>
                        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          {tier.available} tickets remaining
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground line-through">${tier.price}</p>
                        <p className="text-2xl font-bold text-primary">${tier.promoPrice.toFixed(2)}</p>
                        <p className="text-xs text-chart-3">Save ${(tier.price - tier.promoPrice).toFixed(2)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quantity Selector */}
            {selectedTier && (
              <div className="rounded-xl border border-border bg-card p-4">
                <label className="mb-2 block text-sm font-medium text-foreground">Quantity</label>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    -
                  </Button>
                  <span className="w-12 text-center text-xl font-bold text-foreground">{quantity}</span>
                  <Button variant="outline" size="sm" onClick={() => setQuantity(Math.min(10, quantity + 1))}>
                    +
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-emerald-500" />
                  Secure Checkout
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    100% Verified Tickets
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    Instant Mobile Delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    Promo Discount Applied
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Selected</span>
                  <span className="font-medium text-foreground">
                    {selectedTier ? `${quantity}x ${ticketTiers.find((t) => t.id === selectedTier)?.name}` : "None"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="text-muted-foreground">${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-chart-3">
                  <span>Promo Savings</span>
                  <span>
                    -$
                    {selectedTicket
                      ? ((selectedTicket.price - selectedTicket.promoPrice) * quantity).toFixed(2)
                      : "0.00"}
                  </span>
                </div>

                {/* Commission Summary */}
                <div className="rounded-lg border border-border bg-secondary/50 p-3">
                  <p className="text-xs text-muted-foreground mb-1">Promoter Commission</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{promoData.promoterName} (10%)</span>
                    <span className="text-sm font-medium text-primary">${promoterCommission.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-foreground">${total.toFixed(2)}</span>
                </div>
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                  disabled={!selectedTier}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
