import { useForm } from "@mantine/form";
import Input from "../../components/shared/input";
import Button from "../../components/shared/button";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import { toast } from "react-toastify";
import { axios } from "../../utils/axios";
import { useUser } from "../../context/user";
import useHydrate from "../../hooks/hydrate";
function CreateTask() {
  useHydrate({ redirectIfNoToken: true });
  const formState = useForm({
    initialValues: {
      title: "",
      description: "",
    },
    validate: {
      title: (value) => (value.trim().length > 0 ? null : "Name is required"),
      description: (value) =>
        value.trim().length > 0 ? null : "Description is required",
    },
    validateInputOnBlur: true,
  });
  const [loading, setLoading] = useState(false);
  const { username } = useUser((d) => d.user);
  const navigate = useNavigate();
  const handleSubmit = async (values: typeof formState.values) => {
    setLoading(true);
    const { description, title } = values;

    try {
      const { data: res } = await axios.post(
        "/task",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      toast.success("Task created successfully");
      formState.reset();
      navigate(`/task/${res.slug}`);
    } catch (e: any) {
      setLoading(false);
      toast.error(e.response.data.message);
    }
  };
  if (!username) return <Navigate to="/auth/login?to=/task/create" replace />;
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="/vite.svg"
          alt="Event Manager"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create an event
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={formState.onSubmit((data) => handleSubmit(data))}
        >
          <div>
            <Input
              name="title"
              type="text"
              required
              label="Title"
              placeholder="Title of the task"
              {...formState.getInputProps("title")}
              error={formState.errors.name}
              className="ring-1 ring-inset ring-gray-300"
            />
          </div>

          <div className="">
            <label
              htmlFor={"desc"}
              className={clsx(
                "block text-sm font-medium leading-6 text-gray-900"
              )}
            >
              Description
            </label>
            <textarea
              name="Description"
              required
              placeholder="Description of the Task(supports markdown)"
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...formState.getInputProps("description")}
            />
            {formState.errors.description && (
              <p className="text-red-500  text-xs">
                {formState.errors.description}
              </p>
            )}
          </div>
          <div>
            <Button
              type="submit"
              className="flex w-full justify-center"
              loading={loading}
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
