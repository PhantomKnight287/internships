import { Link } from "react-router-dom";
import { Task } from "../../types/task";
import { fromNow } from "../../helpers";
import { Renderer } from "../renderer";

export default function Taskitem(props: Task) {
  return (
    <Link to={`/task/${props.slug}`} className="lg:w-[750px] my-2">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col ">
        <h2 className="text-xl font-semibold mb-2">{props.title}</h2>
        <div className="line-clamp-3">
          <Renderer
            content={props.description}
            removeComponents
            classes="text-grey-500"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">
            {fromNow(props.createdAt)}
          </span>
          <span
            className={`${
              props.completed ? "text-green-500" : "text-red-500"
            } text-sm font-semibold`}
          >
            {props.completed ? "Completed" : "Incomplete"}
          </span>
        </div>
      </div>
    </Link>
  );
}
