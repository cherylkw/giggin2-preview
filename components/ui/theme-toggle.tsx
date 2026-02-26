"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="relative inline-flex h-9 w-[72px] items-center rounded-full bg-muted/20">
        <span className="absolute h-7 w-8 translate-x-1 rounded-full bg-primary shadow-lg" />
        <span className="relative z-10 flex w-full items-center justify-between px-2">
          <Moon className="h-4 w-4 text-primary-foreground" />
          <Sun className="h-4 w-4 text-muted-foreground" />
        </span>
      </div>
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-9 w-[72px] items-center rounded-full bg-muted/20 transition-colors hover:bg-muted/30"
      aria-label="Toggle theme"
      type="button"
    >
      {/* Sliding pill indicator */}
      <span
        className={`absolute h-7 w-8 rounded-full bg-primary shadow-lg transition-transform duration-300 ease-in-out ${
          isDark ? "translate-x-1" : "translate-x-[34px]"
        }`}
      />

      {/* Icons */}
      <span className="relative z-10 flex w-full items-center justify-between px-2">
        <Moon className={`h-4 w-4 transition-colors ${isDark ? "text-primary-foreground" : "text-muted-foreground"}`} />
        <Sun className={`h-4 w-4 transition-colors ${!isDark ? "text-primary-foreground" : "text-muted-foreground"}`} />
      </span>
    </button>
  )
}
