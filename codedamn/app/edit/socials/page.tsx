import { Metadata } from "next"

import EditSocialsPageContent from "./page.content"

export const metadata: Metadata = {
  title: "Edit Socials",
  description: "Edit Your Socials",
}

function EditSocials() {
  return (
    <div className="flex-1">
      <div className="container mt-4">
        <EditSocialsPageContent />
      </div>
    </div>
  )
}

export default EditSocials
