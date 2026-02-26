"use client"

import { Users, Search, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const users = [
  { id: 1, name: "Luna Eclipse", email: "luna@example.com", role: "Artist", status: "Active" },
  { id: 2, name: "The Anthem", email: "booking@theanthem.com", role: "Venue", status: "Active" },
  { id: 3, name: "Live Nation", email: "events@livenation.com", role: "Promoter", status: "Active" },
  { id: 4, name: "Alex Johnson", email: "alex@example.com", role: "Fan", status: "Active" },
  { id: 5, name: "River Stone", email: "river@example.com", role: "Artist", status: "Pending" },
]

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="mt-2 text-muted-foreground">Manage platform users and permissions</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Users className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search users..." className="bg-card pl-10" />
      </div>

      {/* Users Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary/50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">User</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-secondary/30">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline">{user.role}</Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge
                    className={user.status === "Active" ? "bg-chart-3/20 text-chart-3" : "bg-chart-4/20 text-chart-4"}
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
