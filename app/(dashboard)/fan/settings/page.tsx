"use client"

import { Bell, Lock, User, Users2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="mt-2 text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Profile</h2>
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" defaultValue="Alex Johnson" className="bg-secondary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="alex@example.com" className="bg-secondary" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" defaultValue="New York, NY" className="bg-secondary" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Event Recommendations</p>
              <p className="text-sm text-muted-foreground">Get AI-powered event suggestions</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Price Alerts</p>
              <p className="text-sm text-muted-foreground">Notify when ticket prices drop</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Artist Updates</p>
              <p className="text-sm text-muted-foreground">New shows from followed artists</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Privacy</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Share Taste Profile</p>
              <p className="text-sm text-muted-foreground">Allow AI to learn from your preferences</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Public Profile</p>
              <p className="text-sm text-muted-foreground">Let others see your attended events</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Users2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Fan Privacy</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Allow others to find me via shared events</p>
              <p className="text-sm text-muted-foreground">Let fans who attended the same events discover you</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Allow friend suggestions</p>
              <p className="text-sm text-muted-foreground">Receive AI-powered fan connection recommendations</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Allow comments on my Moments</p>
              <p className="text-sm text-muted-foreground">Let other fans comment on your shared moments</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
      </div>
    </div>
  )
}
