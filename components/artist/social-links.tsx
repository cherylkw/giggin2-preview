"use client"

import { Instagram, Youtube, Globe, Music2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SocialLinksProps {
  links: {
    instagram?: string
    spotify?: string
    youtube?: string
    tiktok?: string
    indieCity?: string
    website?: string
  }
}

export function ArtistSocialLinks({ links }: SocialLinksProps) {
  const socialPlatforms = [
    {
      name: "Instagram",
      icon: Instagram,
      url: links.instagram,
      color: "hover:bg-pink-500/20 hover:text-pink-500",
    },
    {
      name: "Spotify",
      icon: Music2,
      url: links.spotify,
      color: "hover:bg-green-500/20 hover:text-green-500",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: links.youtube,
      color: "hover:bg-red-500/20 hover:text-red-500",
    },
    {
      name: "TikTok",
      icon: () => (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      ),
      url: links.tiktok,
      color: "hover:bg-foreground/20 hover:text-foreground",
    },
    {
      name: "Indie City",
      icon: () => <span className="text-xs font-bold">IC</span>,
      url: links.indieCity,
      color: "hover:bg-primary/20 hover:text-primary",
    },
    {
      name: "Website",
      icon: Globe,
      url: links.website,
      color: "hover:bg-blue-500/20 hover:text-blue-500",
    },
  ]

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {socialPlatforms.map((platform) => {
          const Icon = platform.icon
          const isConnected = !!platform.url

          return (
            <Tooltip key={platform.name}>
              <TooltipTrigger asChild>
                {isConnected ? (
                  <a href={platform.url} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="icon"
                      className={`rounded-full border-border transition-colors ${platform.color}`}
                    >
                      <Icon />
                    </Button>
                  </a>
                ) : (
                  <Button
                    variant="outline"
                    size="icon"
                    disabled
                    className="rounded-full border-border opacity-40 cursor-not-allowed bg-transparent"
                  >
                    <Icon />
                  </Button>
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>{isConnected ? platform.name : `${platform.name} - Not connected yet`}</p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
