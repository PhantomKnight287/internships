import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/shared/button";
import Input from "../../components/shared/input";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { axios } from "../../utils/axios";
import { toast } from "react-toastify";
import { useUser } from "../../context/user";
import useHydrate from "../../hooks/hydrate";
export default function Login() {
  const [loading, setLoading] = useState(false);
  useHydrate({ redirectIfNoToken: false });
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const formState = useForm<{
    username: string;
    password: string;
  }>({
    initialValues: {
      username: "",
      password: "",
    },
  });
  const { user, setUser } = useUser();
  const handleSubmit = async (values: typeof formState.values) => {
    const { password, username } = values;
    setLoading(true);
    try {
      const data = await axios.post<{
        user: { username: string };
        token: string;
      }>("/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", data.data.token);
      setLoading(false);
      setUser({ username: data.data.user.username });
      navigate(query.get("to") || "/", { replace: true });
    } catch (e: any) {
      setLoading(false);
      toast.error(e.response.data.message);
    }
  };
  if (user.username) return <Navigate to={query.get("to") || "/"} replace />;
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="/vite.svg"
          alt="Event Manager"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
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
              Login
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
