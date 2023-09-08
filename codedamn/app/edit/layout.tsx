import { ReactNode } from "react"

import Sidebar from "@/components/profile/sidebar"

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <Sidebar />
      {children}
    </div>
  )
}
