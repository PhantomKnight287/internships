import React from "react"

import Heading from "../shared/heading"

const INTERESTS = [
  "Semantics",
  "TED Talks",
  "Udemy",
  "Behavioral",
  "Economics",
  "Hiking",
]

function Interests() {
  return (
    <section>
      <Heading align="left">Interests</Heading>
      <div className="flex flex-row flex-wrap items-center gap-4">
        {INTERESTS.map((interest) => (
          <div
            key={interest}
            className="flex flex-row items-center gap-2 rounded-md bg-gray-50 p-2"
          >
            <span className="text-lg font-semibold">{interest}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Interests
