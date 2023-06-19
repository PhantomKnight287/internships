"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

import Certificates from "./portfolio/certificates"
import Playgrounds from "./portfolio/playgrounds"
import Projects from "./portfolio/projects"
import Stats from "./portfolio/stats"
import AboutMe from "./resume/aboutme"
import Education from "./resume/education"
import Interests from "./resume/interests"
import Languages from "./resume/languages"
import TechSkills from "./resume/techSkills"
import WorkExperience from "./resume/workExperience"

function ContentSwitcher() {
  const [activeContent, setActiveContent] = useState<"portfolio" | "resume">(
    "portfolio"
  )
  return (
    <>
      <div className="mt-8 flex w-full flex-row gap-4 rounded-xl border-[1px] border-gray-200 py-2 pl-4">
        <Button
          variant={activeContent === "portfolio" ? "default" : "ghost"}
          onClick={() => setActiveContent("portfolio")}
        >
          Portfolio
        </Button>
        <Button
          variant={activeContent === "resume" ? "default" : "ghost"}
          onClick={() => setActiveContent("resume")}
        >
          Resume
        </Button>
      </div>
      {activeContent === "portfolio" ? (
        <div className="flex flex-col gap-8 pt-4">
          <Stats />
          <Projects />
          <Playgrounds />
          <Certificates />
        </div>
      ) : (
        <div className="flex flex-col gap-8 pt-4">
          <AboutMe />
          <WorkExperience />
          <Education />
          <TechSkills />
          <Interests />
          <Languages />
        </div>
      )}
    </>
  )
}

export default ContentSwitcher
