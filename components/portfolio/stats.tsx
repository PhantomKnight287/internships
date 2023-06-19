import { IconHeartbeat, IconSparkles } from "@tabler/icons-react"
import clsx from "clsx"
import { Trophy, Zap } from "lucide-react"

const STATS = [
  {
    value: 2,
    name: "Longest streak",
    color: "#6366F1",
    icon: Zap,
  },
  {
    value: 1200,
    name: "Experience points",
    color: "#0EA5E9",
    icon: IconSparkles,
  },
  {
    value: "Novice",
    name: "Current league",
    color: "#FE6712",
    icon: Trophy,
  },
  {
    value: 120,
    name: "Karma points",
    color: "#EC4899",
    icon: IconHeartbeat,
  },
]

export default function Stats() {
  return (
    <section>
      <h1 className="text-left text-2xl font-bold">Stats</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {STATS.map((stat, index) => (
          <div
            key={index}
            className="flex flex-row items-center  rounded-xl border-[1px] border-gray-200 bg-gray-50 p-4"
          >
            <stat.icon
              size={32}
              color={stat.color}
              fill={stat.color}
              className="mr-4"
            />
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-gray-400">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
