"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Send, Smile, UserPlus, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export interface ChatMessage {
  id: string
  userId: string
  userName: string
  userAvatar: string
  text: string
  timestamp: string
  isArtist?: boolean
  isVenue?: boolean
  reaction?: string
  sharedEventId?: string
  sharedEventName?: string
}

interface SocialChatProps {
  messages: ChatMessage[]
  onSendMessage?: (text: string) => void
  onReaction?: (messageId: string, emoji: string) => void
  placeholder?: string
  showAddFriend?: boolean
  showShareEvent?: boolean
  maxHeight?: string
  emptyMessage?: string
}

const emojiReactions = ["🔥", "❤️", "🎵", "🤘", "✨", "🎉"]

export function SocialChat({
  messages,
  onSendMessage,
  onReaction,
  placeholder = "Type a message...",
  showAddFriend = true,
  showShareEvent = false,
  maxHeight = "320px",
  emptyMessage = "No messages yet. Start the conversation!",
}: SocialChatProps) {
  const [newMessage, setNewMessage] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (newMessage.trim() && onSendMessage) {
      onSendMessage(newMessage.trim())
      setNewMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages List */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
        style={{ maxHeight }}
      >
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="flex gap-3 group">
              <Link href={`/fan/profile/${message.userId}`}>
                <Image
                  src={message.userAvatar || "/placeholder.svg"}
                  alt={message.userName}
                  width={36}
                  height={36}
                  className="rounded-full h-9 w-9 cursor-pointer hover:ring-2 hover:ring-primary transition-all shrink-0"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link href={`/fan/profile/${message.userId}`}>
                    <span className="font-medium text-foreground text-sm hover:text-primary transition-colors cursor-pointer">
                      {message.userName}
                    </span>
                  </Link>
                  {message.isArtist && <Badge className="bg-primary/20 text-primary text-xs h-5">Artist</Badge>}
                  {message.isVenue && <Badge className="bg-accent/20 text-accent text-xs h-5">Venue</Badge>}
                  <span className="text-xs text-muted-foreground">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {showAddFriend && !message.isArtist && !message.isVenue && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 px-1 text-primary hover:bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
                    >
                      <UserPlus className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{message.text}</p>
                {message.sharedEventId && (
                  <Link href={`/fan/events/${message.sharedEventId}`}>
                    <div className="mt-2 p-2 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors inline-flex items-center gap-2">
                      <Link2 className="h-3 w-3 text-primary" />
                      <span className="text-xs text-foreground">{message.sharedEventName}</span>
                    </div>
                  </Link>
                )}
                {message.reaction && <span className="inline-block mt-1 text-sm">{message.reaction}</span>}
                {/* Emoji reaction picker */}
                {onReaction && (
                  <div className="relative inline-block">
                    <button
                      onClick={() => setShowEmojiPicker(showEmojiPicker === message.id ? null : message.id)}
                      className="mt-1 text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Smile className="h-4 w-4" />
                    </button>
                    {showEmojiPicker === message.id && (
                      <div className="absolute left-0 bottom-6 bg-card border border-border rounded-lg p-2 flex gap-1 z-10 shadow-lg">
                        {emojiReactions.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => {
                              onReaction(message.id, emoji)
                              setShowEmojiPicker(null)
                            }}
                            className="text-lg p-1 hover:bg-secondary rounded transition-colors"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 pt-4 border-t border-border mt-4">
        {showShareEvent && (
          <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-primary">
            <Link2 className="h-4 w-4" />
          </Button>
        )}
        <input
          type="text"
          placeholder={placeholder}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-secondary rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <Button
          size="icon"
          className="bg-primary text-primary-foreground shrink-0"
          onClick={handleSend}
          disabled={!newMessage.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
