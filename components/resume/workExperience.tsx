import { SocialIcon } from "react-social-icons"

import Heading from "../shared/heading"

const WORK_EXPERIENCE = [
  {
    id: 1,
    role: "Frontend Developer",
    at: "Github",
    location: "London",
    companyName: "Github Inc.",
    from: "May 2021",
    to: "Present",
    logo: <SocialIcon network="github" />,
    description:
      "This role would be great for a web developer with 3+ years' experience in designing and developing responsive websites. This position requires a profound understanding of the development process, using front-end technologies including HTML5, CSS3, JavaScript, jQuery, PHP/WordPress.",
  },
  {
    id: 2,
    role: "Frontend Developer",
    at: "Reddit",
    location: "London",
    companyName: "Reddit Inc.",
    from: "July 2020",
    to: "May 2021",
    logo: <SocialIcon network="reddit" />,
    description:
      "This role would be great for a web developer with 3+ years' experience in designing and developing responsive websites.",
    responsibilities: [
      {
        id: 1,
        description:
          "Create an appealing design and turn it into a WordPress plugin",
      },
      {
        id: 2,
        description: "Manage all technical aspects of the CMS",
      },
      {
        id: 3,
        description: "Conducting website/application tests",
      },
    ],
  },
]

export default function WorkExperience() {
  return (
    <section>
      <Heading align="left" >Work Experience</Heading>

      <div className="flex w-full flex-col gap-5">
        {WORK_EXPERIENCE.map((work) => (
          <div
            key={work.id}
            className="flex flex-row rounded-md border border-gray-200 bg-gray-50 p-4"
          >
            <div>{work.logo}</div>
            <div className="ml-4 flex w-full flex-col">
              <h1 className="text-lg font-bold">
                {work.role} at {work.companyName}
              </h1>
              <div className="flex w-full flex-row flex-wrap">
                <span className="text-gray-600">
                  {work.location} • {work.companyName}
                </span>
                <span className="ml-auto mr-4 text-lg font-semibold">
                  {work.from} - {work.to}
                </span>
              </div>
              <p className="mt-6 text-gray-600">{work.description}</p>
              {work.responsibilities ? (
                <>
                  <h3 className="mt-6 text-lg font-semibold">
                    Job Responsibilities:
                  </h3>
                  <ul className="list-inside list-disc">
                    {work.responsibilities.map((responsibility) => (
                      <li key={responsibility.id} className="text-gray-600">
                        {responsibility.description}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
