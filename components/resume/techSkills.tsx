import React from "react"
import { AiFillHtml5 } from "react-icons/ai"
import { DiCss3, DiReact } from "react-icons/di"
import { IoLogoJavascript } from "react-icons/io"
import {
  SiDart,
  SiFlutter,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
} from "react-icons/si"

import Heading from "../shared/heading"
import { Button } from "../ui/button"

const TECH_SKILLS = [
  {
    name: "HTML 5",
    icon: AiFillHtml5,
    color: "#e44d26",
  },
  {
    name: "CSS 3",
    icon: DiCss3,
    color: "#264de4",
  },
  {
    name: "JavaScript",
    icon: IoLogoJavascript,
    color: "#f7df1e",
  },
  {
    name: "React",
    icon: DiReact,
    color: "#61dbfb",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#000000",
  },
  {
    name: "Mongo",
    icon: SiMongodb,
    color: "#47a248",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "#339933",
  },
  {
    name: "Python",
    icon: SiPython,
  },
  {
    name: "Dart",
    icon: SiDart,
    color: "#00b4ab",
  },
  {
    name: "Flutter",
    icon: SiFlutter,
    color: "#02569b",
  },
]

function TechSkills() {
  return (
    <section>
      <Heading className="text-left" >Tech Skills</Heading>
      <div className="flex flex-row flex-wrap items-center gap-4">
        {TECH_SKILLS.map((skill, index) => (
          <Button key={index} variant={"outline"} className="p-2" >
            <skill.icon className="h-9 w-9" color={skill.color} />
            <span className="ml-2">{skill.name}</span>
          </Button>
        ))}
      </div>
    </section>
  )
}

export default TechSkills
