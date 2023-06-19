"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BiCog } from "react-icons/bi"

const LINKS = [
  {
    href: "/edit",
    label: "Profile",
    icon: BiCog,
  },
  {
    href: "/edit/socials",
    label: "Socials",
    icon: BiCog,
  },
  {
    href: "/edit/portfolio",
    label: "Portfolio",
    icon: BiCog,
  },
  {
    href: "/edit/resume",
    label: "Resume",
    icon: BiCog,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <div>
      <aside
        id="default-sidebar"
        className="sticky left-0 top-20 z-40 w-full  transition-transform md:w-64"
        aria-label="Sidebar"
      >
        <div className="h-fit overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {LINKS.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center rounded-md p-2 ${
                    pathname === href
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                      : "text-gray-600 hover:bg-gray-300 dark:text-gray-400 dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon className="mr-3" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}
