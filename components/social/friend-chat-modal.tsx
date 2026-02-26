"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SocialChat, type ChatMessage } from "./social-chat"

interface FriendChatModalProps {
  isOpen: boolean
  onClose: () => void
  friend: {
    id: string
    name: string
    avatar: string
  }
  messages: ChatMessage[]
  onSendMessage: (text: string) => void
}

export function FriendChatModal({ isOpen, onClose, friend, messages, onSendMessage }: FriendChatModalProps) {
  const [isMinimized, setIsMinimized] = useState(false)

  if (!isOpen) return null

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-3 bg-card border border-border rounded-full px-4 py-2 shadow-lg hover:border-primary/50 transition-colors"
        >
          <Image
            src={friend.avatar || "/placeholder.svg"}
            alt={friend.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-sm font-medium text-foreground">{friend.name}</span>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 bg-card border border-border rounded-xl shadow-2xl flex flex-col max-h-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Image
            src={friend.avatar || "/placeholder.svg"}
            alt={friend.name}
            width={36}
            height={36}
            className="rounded-full"
          />
          <div>
            <h3 className="font-medium text-foreground text-sm">{friend.name}</h3>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMinimized(true)}>
            <Minus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 p-4 overflow-hidden">
        <SocialChat
          messages={messages}
          onSendMessage={onSendMessage}
          placeholder="Message..."
          showAddFriend={false}
          showShareEvent={true}
          maxHeight="300px"
          emptyMessage="Say hi to start chatting!"
        />
      </div>
    </div>
  )
}
