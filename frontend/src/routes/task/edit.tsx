import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axios } from "../../utils/axios";
import { toast } from "react-toastify";
import useHydrate from "../../hooks/hydrate";
import { useForm } from "@mantine/form";
import Button from "../../components/shared/button";
import Input from "../../components/shared/input";
import clsx from "clsx";
import { updateTask } from "../../helpers/task";

export default function EditTask() {
  useHydrate({ redirectIfNoToken: true });
  const [state, setState] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const formState = useForm({
    initialValues: {
      title: "",
      description: "",
      completed: false,
    },
    validate: {
      title: (value) => (value.trim().length > 0 ? null : "Name is required"),
      description: (value) =>
        value.trim().length > 0 ? null : "Description is required",
    },
    validateInputOnBlur: true,
  });

  function fetchTask() {
    setState("loading");
    axios
      .get(`/task/${params.slug}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(({ data }) => {
        setState("success");
        formState.setFieldValue("title", data.title);
        formState.setFieldValue("description", data.description);
        formState.setFieldValue("completed", data.completed);
      })
      .catch((error) => {
        setState("error");
        toast.error(error.response.data.message || "An error occured");
      });
  }

  useEffect(() => {
    fetchTask();
  }, []);

  if (state == "loading")
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <svg
          className={"animate-spin h-5 w-5 mr-3 my-auto"}
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-10"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      </div>
    );
  if (state == "error")
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">An error occured</h1>
      </div>
    );
  return (
    <div className="rounded-lg p-6 mt-8 flex items-center justify-center flex-col">
      <h2 className="text-3xl font-semibold mb-4 text-center">Edit Task</h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={formState.onSubmit((data) => {
            setLoading(true);
            updateTask(data, params.slug as string)
              .then(fetchTask)
              .catch((e) => {
                toast.error(e.message);
              })
              .finally(() => setLoading(false));
          })}
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
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
