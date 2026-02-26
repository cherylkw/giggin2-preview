"use client"

import { useSearchParams } from "next/navigation"

/**
 * Returns a function that appends the ?code= param to any href string
 * if one is present in the current URL.
 */
export function usePreserveCode() {
  const searchParams = useSearchParams()
  const code = searchParams.get("code")

  return (href: string): string => {
    if (!code) return href
    const separator = href.includes("?") ? "&" : "?"
    return `${href}${separator}code=${code}`
  }
}
