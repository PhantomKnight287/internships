import React from "react"

import Heading from "../shared/heading"

const LANGUAGES = ["English", "Hindi", "Punjabi"]

function Languages() {
  return (
    <section>
      <Heading align="left">Languages</Heading>
      <div className="flex flex-row flex-wrap items-center gap-4">
        {LANGUAGES.map((language) => (
          <div
            key={language}
            className="flex flex-row items-center gap-2 rounded-md bg-gray-50 p-2"
          >
            <span className="text-lg font-semibold">{language}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Languages
