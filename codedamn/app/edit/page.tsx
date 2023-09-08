import { Metadata } from "next"

import EditProfilePageContents from "./page.content"

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Edit Your Profile",
}

export default function EditProfile() {
  return (
    <div className="flex-1">
      <div className="container mt-4">
        <EditProfilePageContents />
      </div>
    </div>
  )
}
