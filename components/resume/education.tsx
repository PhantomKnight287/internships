/* eslint-disable @next/next/no-img-element */ // disabling because next/image doesn't support svg

import Heading from "../shared/heading"

const EDUCATION = [
  {
    id: 1,
    logo: <img src="/harvard.svg" alt="Harvard" />,
    name: "Harvard University",
    location: "Cambridge, GA",
    degree: "Bachelor of Science",
    from: "May 2020",
    to: "Present",
    description:
      "Emory Admissions Fellow; assisted Dean of Admissions with student applications and Emory’s marketing strategy in the roll out of the university’s new website",
  },
  {
    id: 2,
    logo: <img src="/harvard.svg" alt="Harvard" />,
    name: "Master Bim High School",
    location: "Atlanta, GA",
    from: "September 2016",
    to: "2020",
  },
]

function Education() {
  return (
    <section>
      <Heading align="left">Education</Heading>
      <div className="flex w-full flex-col gap-5">
        {EDUCATION.map((education) => (
          <div
            key={education.id}
            className="flex flex-row rounded-md border border-gray-200 bg-gray-50 p-4"
          >
            <div className="">{education.logo}</div>
            <div className="ml-4 flex w-full flex-col">
              <h1 className="text-lg font-bold">{education.name}</h1>
              <div className="flex w-full flex-row flex-wrap">
                <span>
                  {education.location}{" "}
                  {education.degree ? <>• {education.degree}</> : null}
                </span>
                <span className="ml-auto mr-4 text-lg font-semibold">
                  {education.from} - {education.to}
                </span>
              </div>
              {education.description ? (
                <p className="mt-6 text-gray-600">{education.description}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Education
