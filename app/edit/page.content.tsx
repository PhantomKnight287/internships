"use client"

import { AVATAR_URL } from "@/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import zod from "zod"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const formSchema = zod.object({
  displayName: zod.preprocess((data) => {
    if (!data || typeof data !== "string") return undefined
    return data === "" ? undefined : data
  }, zod.string().optional()),
  about: zod.preprocess((data) => {
    if (!data || typeof data !== "string") return undefined
    return data === "" ? undefined : data
  }, zod.string().optional()),
  profession: zod.preprocess((data) => {
    if (!data || typeof data !== "string") return undefined
    return data === "" ? undefined : data
  }, zod.enum(["Student", "Teacher", "Working Professional", "Other"]).optional()),
  dateOfBirth: zod.preprocess((data) => {
    if (!data || typeof data !== "string") return undefined
    return data === "" ? undefined : data
  }, zod.date().optional()),
  gender: zod.preprocess((data) => {
    if (!data || typeof data !== "string") return undefined
    return data === "" ? undefined : data
  }, zod.enum(["Male", "Female", "Other"]).optional()),
  location: zod.preprocess((data) => {
    if (!data || typeof data !== "string") return undefined
    return data === "" ? undefined : data
  }, zod.string().optional()),
  followersAndFollowing: zod.boolean().default(true),
  xp: zod.boolean().default(true),
  achievements: zod.boolean().default(true),
})

function EditProfilePageContents() {
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "PhantomKnight287",
      about: "I am a student",
      profession: "Student",
      dateOfBirth: new Date("2005-04-30"),
      gender: "Male",
      location: "New Delhi, India",
      followersAndFollowing: true,
      xp: true,
      achievements: true,
    },
  })
  function onSubmit(values: zod.infer<typeof formSchema>) {
    localStorage.setItem("edit-profile-form", JSON.stringify(values))
    form.reset()
    loadValues()
  }
  function loadValues() {
    const data = localStorage.getItem("edit-profile-form")
    if (data) {
      form.reset(JSON.parse(data))
    }
  }
  useEffect(() => {
    loadValues()
  }, [])
  return (
    <div className="flex flex-col">
      <div className="mb-10 flex flex-row items-center gap-4">
        <Avatar className="h-[50px] w-[50px]">
          <AvatarImage src={AVATAR_URL} />
          <AvatarFallback>PhantomKnight287</AvatarFallback>
        </Avatar>
        <Button variant={"default"}>Upload New Avatar</Button>
        <Button variant={"outline"}>Delete</Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input placeholder="Gurpal Singh" {...field} />
                </FormControl>
                <FormDescription>
                  This will be your name on the platform.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Input placeholder="I am ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="New Delhi, India" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={(d) =>
                    field.onChange(d as zod.infer<typeof formSchema>["gender"])
                  }
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Your Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) => date > new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profession</FormLabel>
                <Select
                  onValueChange={(d) =>
                    field.onChange(
                      d as zod.infer<typeof formSchema>["profession"]
                    )
                  }
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Your Profession" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                    <SelectItem value="Working Professional">
                      Working Professional
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!form.formState.isDirty}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default EditProfilePageContents
