"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get("code")
    const target = code ? `/fan/ask?code=${code}` : "/fan/ask"
    router.replace(target)
  }, [router, searchParams])

  return null
}
