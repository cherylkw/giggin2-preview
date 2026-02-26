"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-50 h-full w-64">
            <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute right-4 top-4 z-50 rounded-full bg-card p-2 text-foreground"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="md:pl-64">
        <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-sm md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="text-lg font-bold text-foreground">Giggin&apos;</span>
          <div className="w-10" />
        </div>
        <div className="hidden md:block">
          <Header />
        </div>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
