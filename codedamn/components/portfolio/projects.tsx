import React, { Fragment } from "react"
import Image from "next/image"
import { AiFillHtml5 } from "react-icons/ai"
import { DiReact } from "react-icons/di"
import { SiNodedotjs } from "react-icons/si"

import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

const IMAGE = "https://images.unsplash.com/photo-1530318271774-4f2cb0d1fda1"

const PROJECTS = [
  {
    id: 1,
    name: "Personal Portfolio",
    stack: [
      {
        id: 1,
        name: "HTML/CSS",
        icon: AiFillHtml5,
        color: "#e44d26",
      },
      {
        id: 1,
        name: "React",
        icon: DiReact,
        color: "#61dbfb",
      },
    ],
  },
  {
    id: 2,
    name: "Lend My Skill",
    stack: [
      {
        id: 1,
        name: "React",
        icon: DiReact,
        color: "#61dbfb",
      },
      {
        id: 2,
        name: "Node",
        icon: SiNodedotjs,
        color: "green",
      },
    ],
  },
  {
    id: 3,
    name: "Personal Portfolio",
    stack: [
      {
        id: 1,
        name: "HTML/CSS",
        icon: AiFillHtml5,
        color: "#e44d26",
      },
      {
        id: 1,
        name: "React",
        icon: DiReact,
        color: "#61dbfb",
      },
    ],
  },
  {
    id: 4,
    name: "Lend My Skill",
    stack: [
      {
        id: 1,
        name: "React",
        icon: DiReact,
        color: "#61dbfb",
      },
      {
        id: 2,
        name: "Node",
        icon: SiNodedotjs,
        color: "green",
      },
    ],
  },
]

export default function Projects() {
  return (
    <section>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-left text-2xl font-bold">Projects</h1>
        <Button
          variant={"link"}
          className="text-sm font-semibold text-blue-500 hover:text-blue-600 md:text-lg md:font-bold"
        >
          Create new project
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <Card
            key={project.id}
            className="rounded-md border border-gray-200 bg-gray-50"
          >
            <CardHeader>
              <Image
                src={IMAGE}
                alt={project.name}
                width={700}
                height={150}
                className="rounded-md"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>
                <h1 className="text-lg font-bold">{project.name}</h1>
              </CardTitle>
              <CardDescription>
                <div className="flex flex-row flex-wrap gap-2">
                  {project.stack.map((stack) => (
                    <div
                      className="flex flex-row items-center gap-1"
                      key={stack.id}
                    >
                      <stack.icon className="h-7 w-7" color={stack.color} />
                      <span>{stack.name}</span>
                    </div>
                  ))}
                </div>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
