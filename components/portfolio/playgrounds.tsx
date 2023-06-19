import { AVATAR_URL } from "@/constants"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { AiFillHtml5 } from "react-icons/ai"

import { Avatar } from "../ui/avatar"
import { Button } from "../ui/button"

const PLAYGROUNDS = [
  {
    id: 1,
    name: "Playground 1",
    icon: AiFillHtml5,
    language: "HTML/CSS",
    lastOpened: "2 mins ago",
  },
  {
    id: 2,
    name: "Playground 2",
    icon: AiFillHtml5,
    language: "HTML/CSS",
    lastOpened: "2 days ago",
  },
  {
    id: 3,
    name: "Playground 3",
    icon: AiFillHtml5,
    language: "HTML/CSS",
    lastOpened: "3 days ago",
  },
  {
    id: 4,
    name: "Playground 4",
    icon: AiFillHtml5,
    language: "HTML/CSS",
    lastOpened: "1 week ago",
  },
]

export default function Playgrounds() {
  return (
    <section>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-left text-2xl font-bold">Playgrounds</h1>
        <Button
          variant={"link"}
          className="text-sm font-semibold text-blue-500 hover:text-blue-600 md:text-lg md:font-bold"
        >
          Create new Playground
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {PLAYGROUNDS.map((playground) => (
          <div
            key={playground.id}
            className="flex flex-row rounded-md border border-gray-200 bg-gray-50 p-4"
          >
            <div>{<playground.icon className="h-8 w-8" fill="#e44d26" />}</div>
            <div className="ml-3 flex flex-col">
              <h1 className="text-left text-lg font-bold">{playground.name}</h1>
              <p>
                {playground.language} • {playground.lastOpened}
              </p>
              <div className="flex flex-row items-center text-sm">
                <div>
                  <Avatar className="h-[30px] w-[30px] border-2 ">
                    <AvatarImage src={AVATAR_URL} />
                    <AvatarFallback>PhantomKnight287</AvatarFallback>
                  </Avatar>
                </div>
                <div className="-ml-2">
                  <Avatar className="h-[30px] w-[30px] border-2 ">
                    <AvatarImage src={AVATAR_URL} />
                    <AvatarFallback>PhantomKnight287</AvatarFallback>
                  </Avatar>
                </div>
                <p className="ml-2 line-clamp-1 text-sm font-semibold text-gray-600 md:text-base">
                  Shared with
                  <span className="ml-1 font-bold">Gurpal, Shivam</span>.. +7
                  more
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
