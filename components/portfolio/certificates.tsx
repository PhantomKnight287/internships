import React from "react"
import { AiFillHtml5 } from "react-icons/ai"
import { SiJavascript } from "react-icons/si"
import { DiReact } from "react-icons/di"

import { Button } from "../ui/button"

const CERTIFICATES = [
  {
    id: 1,
    name: "Advanced Theortical JavaScript",
    icon: AiFillHtml5,
    issuedOn: "Dec 16th, 2022",
    color: "#e44d26",
  },
  {
    id: 2,
    name: "HTML/CSS",
    icon: AiFillHtml5,
    issuedOn: "Dec 16th, 2022",
    color: "#e44d26",
  },
  {
    id: 3,
    name: "Build a decentralized to-do application",
    icon: SiJavascript,
    issuedOn: "Dec 16th, 2022",
    color: "#f7df1e",
  },
  {
    id: 4,
    name: "React JS",
    icon: DiReact,
    issuedOn: "Dec 16th, 2022",
    color: "#61dbfb",
  },
]

export default function Certificates() {
  return (
    <section>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-left text-2xl font-bold">Certificates</h1>
        <Button
          variant={"link"}
          className="text-sm font-semibold text-blue-500 hover:text-blue-600 md:text-lg md:font-bold"
        >
          Add new certificate
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {CERTIFICATES.map((certificate) => (
          <div
            key={certificate.id}
            className="flex flex-col rounded-md border border-gray-200 bg-gray-50 p-4"
          >
            <div>
              {
                <certificate.icon
                  className="h-12 w-12"
                  fill={certificate.color}
                />
              }
            </div>
            <div className="ml-2 flex flex-col">
              <h1 className="text-left text-lg font-bold">
                {certificate.name}
              </h1>
              <p className="text-sm text-gray-600">
                Issued on {certificate.issuedOn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
