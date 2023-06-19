import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Loader2 className="animate-spin" size="5rem" />
    </div>
  )
}
