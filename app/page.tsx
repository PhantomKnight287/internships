import { AVATAR_URL } from "@/constants"
import { IconBookmarks } from "@tabler/icons-react"
import { MapPin } from "lucide-react"
import { SocialIcon } from "react-social-icons"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Banner from "@/components/portfolio/banner"

import ContentSwitcher from "../components/contentSwitcher"

const SKILLS = [
  "HTML 5",
  "CSS 3",
  "JavaScript",
  "React",
  "Next.js",
  "Python",
  "Node.js",
  "Nest.js",
  "Prisma",
]

const SOCIALS = [
  "https://twitter.com/gurpalsingh287",
  "https://github.com/phantomknight287",
  "https://www.linkedin.com/in/gurpal-singh-0a2935221/",
  "https://instagram.com/phantomknight287/",
]

export default function IndexPage() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <div className="container">
        <div className="rounded-xl border-[1px] border-gray-200 p-0">
          <Banner />
          <div className="flex flex-col lg:flex-row">
            <div className="xs:ml-0 xs:w-fit xs:mx-auto  -mt-14 ml-4">
              <Avatar className="xs:mx-auto xs:my-0 h-[140px] w-[140px] border-4 border-white ">
                <AvatarImage src={AVATAR_URL} />
                <AvatarFallback>PhantomKnight287</AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-6 flex flex-1 flex-col">
              <div className="mt-4 flex flex-row flex-wrap lg:flex-nowrap">
                <h1 className="text-2xl font-bold">Gurpal Singh</h1>
                <div className="flex flex-row items-center">
                  <span className="ml-2 h-fit rounded-md bg-[#BEF264] px-4 py-1 text-sm font-semibold text-black">
                    Pro
                  </span>
                  <span className="ml-4 h-fit rounded-md bg-[#e0f2fe] px-2 py-1 text-sm font-semibold">
                    Looking for job
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-md text-gray-600">
                  Full stack dev at Hackarmour | IGNOU&quot;18
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  <MapPin className="mr-2 inline-block h-5 w-5" />
                  New Delhi, India
                </p>
              </div>
              {/* Skills List */}
              <div className="mt-4 flex flex-row flex-wrap gap-4">
                {SKILLS.map((skill, index) => (
                  <Button key={index} variant="outline">
                    {skill}
                  </Button>
                ))}
              </div>
              {/* Skills list end */}
              <div className="my-8 h-[0.33px] w-full bg-gray-300" />
              <div className="mb-8 flex flex-row flex-wrap justify-center md:justify-normal lg:flex-nowrap">
                {/* Social Media icons */}
                <div className="flex flex-row flex-wrap lg:flex-nowrap">
                  {SOCIALS.map((social, index) => (
                    <Button
                      variant={"ghost"}
                      key={index}
                      className="hover:bg-[unset]"
                    >
                      <SocialIcon
                        url={social}
                        style={{ height: 45, width: 45 }}
                      />
                    </Button>
                  ))}
                </div>
                {/* social media icons end */}
                {/* contact and bookmark button */}
                <div className="mt-4 flex flex-row items-center sm:mr-0 sm:mt-0 md:ml-auto md:mr-5">
                  <Button variant={"outline"} className="hover:bg-[unset]">
                    <IconBookmarks size={20} />
                  </Button>
                  <Button variant={"default"} className="ml-4" asChild>
                    <a href="mailto:phantomknight287@proton.me">Contact</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ContentSwitcher />
      </div>
    </div>
  )
}
