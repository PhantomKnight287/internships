import { Link, redirect, Navigate } from "react-router-dom";
import Button from "../../components/shared/button";
import Input from "../../components/shared/input";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { axios } from "../../utils";
import { toast } from "react-toastify";
import { useUser } from "../../context/user";
import useHydrate from "../../hooks/hydrate";
export default function Register() {
  const [loading, setLoading] = useState(false);
  useHydrate({ redirectIfNoToken: false });
  const formState = useForm<{
    username: string;
    password: string;
  }>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      password: (v) =>
        v.trim().length > 8
          ? null
          : "Password must be at least 8 characters long",
      username: (v) =>
        v.trim().length > 3
          ? null
          : "Username must be at least 3 characters long",
    },
  });
  const { user, setUser } = useUser();
  const handleSubmit = async (values: typeof formState.values) => {
    const { password, username } = values;
    setLoading(true);
    try {
      const data = await axios.post<{
        username: string;
        token: string;
      }>("/auth/register", {
        username,
        password,
      });
      localStorage.setItem("token", data.data.token);
      setLoading(false);
      setUser({ username: data.data.username });
      redirect("/events");
    } catch (e: any) {
      setLoading(false);
      toast.error(e.response.data.message);
    }
  };
  if (user.username) return <Navigate to="/events" replace />;
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="/vite.svg"
          alt="Event Manager"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={formState.onSubmit((data) => handleSubmit(data))}
        >
          <div>
            <Input
              name="username"
              type="text"
              autoComplete="username"
              required
              label="Username"
              {...formState.getInputProps("username")}
              placeholder="John Doe"
            />
          </div>

          <div className="flex items-center justify-between">
            <Input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              label="Password"
              {...formState.getInputProps("password")}
              placeholder="********"
            />
          </div>

          <div>
            <Button
              type="submit"
              className="flex w-full justify-center"
              loading={loading}
            >
              Sign Up
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
