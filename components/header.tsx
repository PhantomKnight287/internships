import React from "react";
import { Input } from "./ui/input";
import { LucideBell, LucideZap } from "lucide-react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default async function Header() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const username = user?.user_metadata?.username;

  return (
    <header className="flex flex-row p-4 border-b border-gray-200 w-full sticky top-0 backdrop-blur-3xl">
      <div className="flex items-center justify-center">
        <h1 className="lg:text-3xl font-bold text-center text-xl">CodeDamn</h1>
      </div>
      <div className="flex flex-row ml-auto items-center">
        <div className="hidden lg:flex flex-row items-center">
          <Input placeholder="Search" />
        </div>
        <LucideZap className="w-6 h-6 ml-2" fill="#6366F1" strokeWidth={0.1} />
        <span className="text-gray-500 font-bold">2</span>
        <div className="relative inline-block">
          <LucideBell className="w-6 h-6 ml-2" />
          <span className="absolute text-white bg-red-500 rounded-full -top-1 right-0 text-[10px] py-[1px] px-[3px]">
            2
          </span>
        </div>
        <div className="ml-4">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${
                username || "PhantomKnight"
              }`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
