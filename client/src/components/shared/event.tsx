import { API_URL, DAYS } from "../../constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { axios } from "../../utils";
import { toast } from "react-toastify";
import clsx from "clsx";
import { useUser } from "../../context/user";
import { Renderer } from "../renderer";
dayjs.extend(relativeTime);
export interface Event {
  name: string;
  id: number;
  data: string;
  time: string;
  author_username: string;
  location: string;
  image: string;
  is_liked: boolean;
}

export default function EventCard(props: Event) {
  const { name, data, time, location, image, is_liked, id } = props;
  const [liked, setLiked] = useState(is_liked);
  const date = useMemo(() => dayjs(time), [time]);
  const { username } = useUser((s) => s.user);

  const like = async () => {
    try {
      await axios.post(`/events/${id}/like`, undefined, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      setLiked(true);
    } catch (e: any) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };
  const unlike = async () => {
    try {
      await axios.delete(`/events/${id}/unlike`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      setLiked(false);
    } catch (e: any) {
      console.log(e);
    }
  };
  return (
    <div className=" bg-gray-200 flex flex-col md:flex-row gap-4 md:gap-0 justify-center md:justify-start rounded-lg p-4 my-4 md:w-full">
      <img
        src={`${API_URL}/media/${image}`}
        alt="banner"
        className="max-w-full rounded-md block aspect-square h-[180px] object-center object-cover "
      />
      <div className="flex flex-col justify-start md:ml-10 w-full">
        <Link to={`/event/${id}`}>
          <h2 className="block text-2xl font-bold leading-6 text-gray-900 capitalize line-clamp-2">
            {name}
          </h2>
        </Link>
        <p className="text-lg font-semibold leading-6 text-gray-900 line-clamp-2 lg:line-clamp-6 mt-3">
          <Renderer content={data} removeComponents />
        </p>
        <div className="flex flex-row mt-auto w-full">
          <div className="flex flex-col">
            <p className="block text-sm font-medium leading-6 text-gray-900 mt-auto">
              {DAYS[date.day()]}, {date.format("DD MMM YYYY")} at{" "}
              {date.format("HH:mm")}
            </p>
            <p className="block text-sm font-medium leading-6 text-gray-900">
              {location}
            </p>
          </div>
          <div
            className={clsx("flex flex-row ml-auto", {
              hidden: !username,
            })}
          >
            <button
              className="flex flex-row"
              onClick={() => {
                if (liked) {
                  unlike();
                } else {
                  like();
                }
              }}
            >
              {liked ? (
                <AiFillHeart className="text-red-500 w-6 h-6" />
              ) : (
                <AiOutlineHeart className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
