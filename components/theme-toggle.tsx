"use client"

import { useTheme } from "next-themes"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Icons.sun className="rotate-0 scale-100 transition-all " />
      <Icons.moon className="absolute rotate-90 scale-0 transition-all" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
