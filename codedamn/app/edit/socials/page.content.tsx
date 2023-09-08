"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import zod from "zod"

import { Button } from "@/components/ui/button"
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

const formSchema = zod.object({
  githubUrl: zod.preprocess((g) => {
    if (!g || typeof g !== "string") return undefined
    return g === "" ? undefined : g
  }, zod.string().url().optional()),
  linkedinUrl: zod.preprocess((data) => {
    if (!data || typeof data !== "string") return undefined
    return data === "" ? undefined : data
  }, zod.string().url().optional()),
  facebookUrl: zod.preprocess((data) => {
    if (!data || typeof data !== "string") return undefined
    return data === "" ? undefined : data
  }, zod.string().url().optional()),
  instagramUrl: zod.preprocess((data) => {
    if (!data || typeof data !== "string") return undefined
    return data === "" ? undefined : data
  }, zod.string().url().optional()),
  dribbbleUrl: zod.preprocess((data) => {
    if (!data || typeof data !== "string") return undefined
    return data === "" ? undefined : data
  }, zod.string().url().optional()),
  behanceUrl: zod.preprocess((data) => {
    if (!data || typeof data !== "string") return undefined
    return data === "" ? undefined : data
  }, zod.string().url().optional()),
})

export default function EditSocialsPageContent() {
  // 1. Define your form.
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      githubUrl: "",
      linkedinUrl: "",
      facebookUrl: "",
      instagramUrl: "",
      dribbbleUrl: "",
      behanceUrl: "",
    },
    criteriaMode: "firstError",
    mode: "onBlur",
  })
  function loadValues() {
    const socials = localStorage.getItem("socials")
    if (socials) {
      form.reset(JSON.parse(socials))
    }
  }
  function onSubmit(values: zod.infer<typeof formSchema>) {
    localStorage.setItem("socials", JSON.stringify(values))
    form.reset()
    loadValues()
  }
  useEffect(() => {
    loadValues()
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="githubUrl"
          rules={{
            required: false,
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://github.com/phantomknight287"
                  {...field}
                />
              </FormControl>
              <FormDescription>Your Github profile link.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="behanceUrl"
          rules={{
            required: false,
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Behance</FormLabel>
              <FormControl>
                <Input placeholder="https://behance.com" {...field} />
              </FormControl>
              <FormDescription>Your Behance profile link.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dribbbleUrl"
          rules={{
            required: false,
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dribble</FormLabel>
              <FormControl>
                <Input placeholder="https://dribbble.com" {...field} />
              </FormControl>
              <FormDescription>Your Dribbble profile link.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facebookUrl"
          rules={{
            required: false,
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facebook</FormLabel>
              <FormControl>
                <Input placeholder="https://facebook.com" {...field} />
              </FormControl>
              <FormDescription>Your Facebook profile link.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagramUrl"
          rules={{
            required: false,
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram</FormLabel>
              <FormControl>
                <Input placeholder="https://instagram.com" {...field} />
              </FormControl>
              <FormDescription>Your Instagram profile link.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedinUrl"
          rules={{
            required: false,
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Linked In</FormLabel>
              <FormControl>
                <Input placeholder="https://linkedin.com" {...field} />
              </FormControl>
              <FormDescription>Your Linkedin profile link.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isDirty}>
          Save Changes
        </Button>
      </form>
    </Form>
  )
}
