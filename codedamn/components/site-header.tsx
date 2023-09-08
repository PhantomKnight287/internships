"use client"

import React from "react"
import Link from "next/link"
import { AVATAR_URL } from "@/constants"
import { Bell, Zap } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Input } from "./ui/input"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex w-full flex-row border-b border-gray-200 bg-white p-4">
      <div className="flex items-center justify-center">
        <Link href="/">
          <h1 className="text-center text-xl font-bold lg:text-2xl">
            CodeDamn
          </h1>
        </Link>
      </div>
      <div className="ml-auto flex flex-row items-center">
        <div className="hidden flex-row items-center lg:flex">
          <Input placeholder="Search" />
        </div>
        <Zap className="ml-2 h-6 w-6" fill="#6366F1" strokeWidth={0.1} />
        <span className="font-bold text-gray-500">2</span>
        <div className="relative ml-2 inline-block">
          <Bell className="ml-2 h-6 w-6" />
          <span className="absolute -top-1 right-0 rounded-full bg-red-500 px-[5px] py-[1px] text-[10px] text-white">
            2
          </span>
        </div>
        <div className="ml-4">
          <Link href="/edit">
            <Avatar>
              <AvatarImage src={AVATAR_URL} />
              <AvatarFallback>PhantomKnight287</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  )
}
