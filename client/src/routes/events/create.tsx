import { useForm } from "@mantine/form";
import Input from "../../components/shared/input";
import Button from "../../components/shared/button";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import DateTimePicker from "react-datetime-picker";
import { toast } from "react-toastify";
import { axios } from "../../utils";
import { useUser } from "../../context/user";
function CreateEvent() {
  const formState = useForm({
    initialValues: {
      name: "",
      description: "",
      date: new Date(),
      location: "",
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Name is required"),
      description: (value) =>
        value.trim().length > 0 ? null : "Description is required",
      date: (value) => (!value ? "Date is required" : null),
      location: (value) =>
        value.trim().length > 0 ? null : "Location is required",
    },
    validateInputOnBlur: true,
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { username } = useUser((d) => d.user);
  const navigate = useNavigate();
  const handleSubmit = async (values: typeof formState.values) => {
    if (!file) return toast.error("Please upload a file");
    setLoading(true);
    const { date, description, location, name } = values;
    const data = new FormData();
    data.append("image", file, file.name);
    data.append("name", name);
    data.append("data", description);
    data.append("location", location);
    data.append("time", date.toISOString());
    try {
      const { data: res } = await axios.post("/event", data, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      toast.success("Event created successfully");
      navigate(`/event/${res.id}`);
    } catch (e: any) {
      setLoading(false);
      toast.error(e.response.data.message);
    }
  };
  if (!username) return <Navigate to="/auth/login" replace />;
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
              name="name"
              type="text"
              required
              label="Name"
              placeholder="Name of the event"
              {...formState.getInputProps("name")}
              error={formState.errors.name}
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
              placeholder="supports markdown"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...formState.getInputProps("description")}
            />
            {formState.errors.description && (
              <p className="text-red-500  text-xs">
                {formState.errors.description}
              </p>
            )}
          </div>
          <div className="">
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="mb-8"
              />
            ) : null}
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              className={clsx({
                // button colors
                "file:bg-violet-50 file:text-violet-500 hover:file:bg-violet-100":
                  true,
                // button shape and spacing
                "file:rounded-lg file:rounded-tr-none file:rounded-br-none":
                  true,
                "file:px-4 file:py-2 file:mr-4 file:border-none": true,
                // overall input styling
                "hover:cursor-pointer border rounded-lg text-gray-400 w-full":
                  true,
              })}
              id="file_input"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="file_input"
            >
              Select date and time of the event
            </label>
            <DateTimePicker {...formState.getInputProps("date")} />
          </div>
          <div className="">
            <Input
              name="location"
              type="text"
              required
              label="Location of the event"
              placeholder="Eiffel Tower"
              {...formState.getInputProps("location")}
              error={formState.errors.location}
            />
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

export default CreateEvent;
