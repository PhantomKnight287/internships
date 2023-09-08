"use client"

import { useEffect, useState } from "react"
import { SocialIcon } from "react-social-icons"

import { Button } from "../ui/button"

type Socials = {
  githubUrl: string | undefined
  linkedinUrl: string | undefined
  facebookUrl: string | undefined
  instagramUrl: string | undefined
  dribbbleUrl: string | undefined
  behanceUrl: string | undefined
}

function Socials() {
  const [socials, setSocials] = useState<Socials | null>(null)

  useEffect(() => {
    setSocials(JSON.parse(localStorage.getItem("socials") || "null"))
  }, [])

  return (
    <div className="mb-8 flex flex-row flex-wrap justify-center md:justify-normal lg:mb-0 lg:flex-nowrap">
      {/* Social Media icons */}
      <div className="flex flex-row flex-wrap lg:flex-nowrap">
        {socials != null ? (
          <>
            {Object.keys(socials).map((social, index) => (
              <Button
                variant={"ghost"}
                key={index}
                className="hover:bg-[unset]"
              >
                <SocialIcon
                  url={socials[social as keyof typeof socials] as string}
                  style={{ height: 45, width: 45 }}
                />
              </Button>
            ))}
          </>
        ) : null}
      </div>
    </div>
  )
}

export default Socials
