"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import zod from "zod";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8).max(100),
  username: zod.string().optional(),
});

export default function Auth() {
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
    mode: "onChange",

  });

  const [view, setView] = useState<"sign-in" | "sign-up" | "check-email">(
    "sign-in"
  );
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: zod.infer<typeof formSchema>) {
    console.log(view);
    setLoading(true);
    if (view === "sign-up") await handleSignUp(values);
    else if (view === "sign-in") await handleSignIn(values);
    setLoading(false);
  }

  const handleSignUp = async (e: zod.infer<typeof formSchema>) => {
    await supabase.auth.signUp({
      email: e.email,
      password: e.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          username: e.username,
        },
      },
    });
    setView("check-email");
  };

  const handleSignIn = async (e: zod.infer<typeof formSchema>) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: e.email,
      password: e.password,
    });
    console.log({ data, error });
    router.push("/");
  };

  return (
    <div className="flex-1 flex flex-col w-full max-w-sm justify-center gap-2">
      {view === "check-email" ? (
        <p className="text-center">
          Check <span className="font-bold">{form.getValues("email")}</span> to
          continue signing up
        </p>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center mb-3">
            {view === "sign-in"
              ? "Login to your account"
              : "Create a new account"}
          </h1>
          <FormProvider {...form}>
            <form
              className="flex flex-col w-full max-w-sm justify-center gap-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="test@mail.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      We'll never share your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {view === "sign-up" ? (
                <FormField
                  control={form.control}
                  name="username"
                  rules={{
                    required: false,
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type={"password"}
                        placeholder="•••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {view === "sign-in" ? (
                <>
                  <Button
                    className="rounded px-4 py-2 text-gray-200 mb-6"
                    isLoading={loading}
                  >
                    Sign In
                  </Button>
                  <p className="text-sm text-gray-500 text-center">
                    Don't have an account?
                    <button
                      className="ml-1 underline"
                      onClick={() => setView("sign-up")}
                    >
                      Sign Up Now
                    </button>
                  </p>
                </>
              ) : null}
              {view === "sign-up" ? (
                <>
                  <Button
                    className="rounded px-4 py-2 text-gray-200 mb-6"
                    isLoading={loading}
                  >
                    Sign Up
                  </Button>
                  <p className="text-sm text-gray-500 text-center">
                    Already have an account?
                    <button
                      className="ml-1 underline"
                      onClick={() => setView("sign-in")}
                    >
                      Sign Up Now
                    </button>
                  </p>
                </>
              ) : null}
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
}
