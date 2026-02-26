"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Music,
  Bookmark,
  Camera,
  Settings,
  Calendar,
  Users,
  Ticket,
  LayoutDashboard,
  MapPin,
  ChevronDown,
  Sparkles,
  Users2,
  Disc,
  Activity,
  Lightbulb,
  Coins,
  User,
} from "lucide-react"

type UserRole = "fan" | "artist" | "venue" | "promoter" | "admin"

const navigation: Record<UserRole, { name: string; href: string; icon: React.ElementType }[]> = {
  fan: [
    { name: "Pulse™", href: "/fan/pulse", icon: Activity },
    { name: "Stage", href: "/fan/stage", icon: Disc },
    { name: "Ask Giggin'", href: "/fan/ask", icon: Sparkles },
    { name: "Stash", href: "/fan/stash", icon: Bookmark },
    { name: "Moments", href: "/fan/moments", icon: Camera },
    { name: "Friends", href: "/fan/friends", icon: Users2 },
    { name: "Settings", href: "/fan/settings", icon: Settings },
  ],
  artist: [
    { name: "Dashboard", href: "/artist/dashboard", icon: LayoutDashboard },
    { name: "Events", href: "/artist/events", icon: Calendar },
    { name: "Insights", href: "/artist/insights", icon: Lightbulb },
    { name: "Ask Giggin'", href: "/artist/ask", icon: Sparkles },
    { name: "Finance", href: "/artist/finance", icon: Coins },
    { name: "Profile", href: "/artist/settings", icon: User },
  ],
  venue: [
    { name: "Dashboard", href: "/venue/dashboard", icon: LayoutDashboard },
    { name: "Events", href: "/venue/events", icon: Ticket },
    { name: "Calendar", href: "/venue/calendar", icon: Calendar },
    { name: "Insights", href: "/venue/insights", icon: Lightbulb },
    { name: "Ask Giggin'", href: "/venue/ask", icon: Sparkles },
    { name: "Finance", href: "/venue/finance", icon: Coins },
    { name: "Venue Profile", href: "/venue/profile", icon: MapPin },
  ],
  promoter: [
    { name: "Dashboard", href: "/promoter/dashboard", icon: LayoutDashboard },
    { name: "Events", href: "/promoter/events", icon: Ticket },
    { name: "Calendar", href: "/promoter/calendar", icon: Calendar },
    { name: "Insights", href: "/promoter/insights", icon: Lightbulb },
    { name: "Ask Giggin'", href: "/promoter/ask", icon: Sparkles },
    { name: "Finance", href: "/promoter/contracts", icon: Coins },
  ],
  admin: [
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Event Ingestion", href: "/admin/events", icon: Calendar },
    { name: "AI Monitoring", href: "/admin/ai", icon: Sparkles },
  ],
}

const roleLabels: Record<UserRole, string> = {
  fan: "Fan",
  artist: "Artist",
  venue: "Venue",
  promoter: "Promoter",
  admin: "Admin",
}

function getRoleFromPathname(pathname: string): UserRole {
  if (pathname.startsWith("/artist")) return "artist"
  if (pathname.startsWith("/venue")) return "venue"
  if (pathname.startsWith("/promoter")) return "promoter"
  if (pathname.startsWith("/admin")) return "admin"
  return "fan"
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void } = {}) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [roleMenuOpen, setRoleMenuOpen] = useState(false)
  const codeParam = searchParams.get("code")
  const codeSuffix = codeParam ? `?code=${codeParam}` : ""

  const currentRole = getRoleFromPathname(pathname)

  // Demo mode: only show Ask Giggin' nav item
  const demoRoles: UserRole[] = ["fan", "artist"]
  const currentNav = navigation[currentRole].filter((item) => item.name === "Ask Giggin'")

  const handleRoleChange = (role: UserRole) => {
    setRoleMenuOpen(false)
    const defaultPages: Record<UserRole, string> = {
      fan: "/fan/ask",
      artist: "/artist/ask",
      venue: "/venue/dashboard",
      promoter: "/promoter/dashboard",
      admin: "/admin/users",
    }
    router.push(defaultPages[role] + codeSuffix)
    onNavigate?.()
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Music className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold text-foreground">Giggin&apos;</span>
      </div>

      {/* Role Selector */}
      <div className="border-b border-border p-4">
        <button
          onClick={() => setRoleMenuOpen(!roleMenuOpen)}
          className="flex w-full items-center justify-between rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
        >
          <span>{roleLabels[currentRole]} View</span>
          <ChevronDown className={cn("h-4 w-4 transition-transform", roleMenuOpen && "rotate-180")} />
        </button>
        {roleMenuOpen && (
          <div className="mt-2 space-y-1">
            {demoRoles.map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={cn(
                  "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  currentRole === role
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {roleLabels[role]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {currentNav.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.name}
              href={item.href + codeSuffix}
              onClick={() => onNavigate?.()}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* AI Powered Badge */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs text-primary">
          <Sparkles className="h-4 w-4" />
          <span>Powered by Giggin&apos; AI</span>
        </div>
      </div>
    </aside>
  )
}
