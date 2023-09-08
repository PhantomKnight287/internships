import React from "react"
import Image from "next/image"

import { Button } from "../ui/button"

function Banner() {
  return (
    <div className="relative">
      <div className="h-[200px] overflow-hidden rounded-t-xl">
        <Image
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
          alt="Cover photo"
          width={1920}
          height={200}
        />
        <div className="absolute right-4 top-4">
          <Button variant={"outline"}>Edit Cover Photo</Button>
        </div>
      </div>
    </div>
  )
}

export default Banner
