"use client"

import { useState } from "react"
import { MessageCircle, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SocialChat, type ChatMessage } from "./social-chat"
import { mockEventChat } from "@/lib/mock-data"

interface EventChatProps {
  eventId: string
}

export function EventChat({ eventId }: EventChatProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const initialMessages = mockEventChat
    .filter((m) => m.eventId === eventId)
    .map((m) => ({
      id: m.id,
      userId: m.userId,
      userName: m.userName,
      userAvatar: m.userAvatar,
      text: m.text,
      timestamp: m.timestamp,
      isArtist: m.isArtist,
      isVenue: m.isVenue,
    }))

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: `ec-${Date.now()}`,
      userId: "currentUser",
      userName: "You",
      userAvatar: "/user-avatar.jpg",
      text,
      timestamp: new Date().toISOString(),
    }
    setMessages([...messages, newMessage])
  }

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(
      messages.map((m) => (m.id === messageId ? { ...m, reaction: m.reaction === emoji ? undefined : emoji } : m)),
    )
  }

  return (
    <Card className="border-border">
      <CardHeader
        className="cursor-pointer hover:bg-secondary/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Event Chat
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{messages.length} messages</Badge>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <SocialChat
            messages={messages}
            onSendMessage={handleSendMessage}
            onReaction={handleReaction}
            placeholder="Chat with other fans..."
            showAddFriend={true}
            maxHeight="350px"
            emptyMessage="Be the first to start the conversation!"
          />
        </CardContent>
      )}
    </Card>
  )
}
