import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axios } from "../../utils/axios";
import { Task } from "../../types/task";
import { toast } from "react-toastify";
import useHydrate from "../../hooks/hydrate";
import { Renderer } from "../../components/renderer";
import { fromNow } from "../../helpers";
import { FcCheckmark } from "react-icons/fc";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { GoPencil } from "react-icons/go";
import { deleteTask, updateTask } from "../../helpers/task";

export default function TaskInfo() {
  useHydrate({ redirectIfNoToken: true });
  const [task, setTask] = useState<Task | null>(null);
  const navigate = useNavigate();
  const [state, setState] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const params = useParams();

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
        setTask(data);
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
      <h2 className="text-3xl font-semibold mb-4 text-center">{task?.title}</h2>
      <div className="flex flex-row items-center justify-center flex-wrap">
        <div className="flex flex-col items-center justify-center lg:min-w-[110px] mx-2 lg:m-0">
          <button
            className="appearance-default appearance-default:hover"
            title="Edit task"
            aria-title="Edit task"
            onClick={() => navigate(`/task/${task?.slug}/edit`)}
          >
            <GoPencil
              className="text-4xl text-yellow-500 bg-yellow-500/25 rounded-md p-2"
              size={30}
            />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center lg:min-w-[110px] mx-2 lg:m-0">
          <button
            className="appearance-default appearance-default:hover"
            title={task?.completed ? "Mark as not done" : "Mark as done"}
            aria-title={task?.completed ? "Mark as not done" : "Mark as done"}
            onClick={() => {
              updateTask(
                {
                  completed: !task?.completed,
                  title: task?.title as string,
                  description: task?.description as string,
                },
                task!.slug as string
              )
                .then(fetchTask)

                .catch((error) => {
                  toast.error(error.message || "An error occured");
                });
            }}
          >
            {task?.completed ? (
              <RxCross1
                className="text-4xl text-red-500 bg-red-500/25 rounded-full p-2"
                size={30}
              />
            ) : (
              <FcCheckmark
                className="text-4xl text-green-500 bg-green-500/25 rounded-md p-2"
                size={30}
              />
            )}
          </button>
        </div>
        <div className="flex flex-col items-center justify-center lg:min-w-[110px] mx-2 lg:m-0">
          <button
            className="appearance-default appearance-default:hover"
            title="Delete task"
            aria-title="Delete task"
            onClick={() => {
              deleteTask(task?.slug as string)
                .then(() => {
                  navigate("/", { replace: true });
                })
                .catch((error) => {
                  toast.error(error.message || "An error occured");
                });
            }}
          >
            <AiOutlineDelete
              className="text-4xl text-red-500 bg-red-500/25 rounded-md p-2"
              size={30}
            />
          </button>
        </div>
      </div>
      <span className="text-gray-400 text-center mt-4">
        Created: {fromNow(task?.createdAt as string)}
      </span>
      <div className="container">
        <Renderer content={task?.description || ""} />
      </div>
    </div>
  );
}
