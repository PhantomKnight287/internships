import { BsFillCalendar2CheckFill } from "react-icons/bs";
import dayjs from "dayjs";
import "dayjs/locale/en"; // Import the locale you prefer
import relativeTime from "dayjs/plugin/relativeTime";
import "tailwindcss/tailwind.css";
import { API_URL, DAYS } from "../../constants";
import { axios } from "../../utils";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Event } from "../../components/shared/event";
import { toast } from "react-toastify";
import useHydrate from "../../hooks/hydrate";
import { AiFillHeart, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { Renderer } from "../../components/renderer";
import { CiLocationOn } from "react-icons/ci";

dayjs.extend(relativeTime);
dayjs.locale("en");

const EventInfo = () => {
  const [event, setEvent] = useState<Event>({} as Event);
  useHydrate({ redirectIfNoToken: false });
  const { id } = useParams();
  const like = async () => {
    try {
      await axios.post(`/events/${id}/like`, undefined, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      setEvent((d) => ({ ...d, is_liked: true }));
    } catch (e: any) {
      console.log(e);
      toast.error(e.response.event.message);
    }
  };
  const unlike = async () => {
    try {
      await axios.delete(`/events/${id}/unlike`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      setEvent((d) => ({ ...d, is_liked: false }));
    } catch (e: any) {
      console.log(e);
    }
  };
  useEffect(() => {
    axios
      .get(`/event/${id}`)
      .then((data) => {
        setEvent(data.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [id]);
  const date = useMemo(() => dayjs(event.time), [event.time]);
  return (
    <div className="flex flex-col lg:flex-row  justify-center">
      <div className="flex flex-col w-full lg:flex-[0.5] lg:min-h-screen bg-gray-100 pt-8 lg:pl-4">
        <div
          className={`w-full h-[405px] bg-center bg-contain bg-no-repeat rounded-md overflow-hidden`}
          style={{
            backgroundImage: `url(${API_URL}/media/${event.image})`,
          }}
        />
        <div className="max-w-md p-4">
          <h1 className="text-2xl font-bold mb-4">{event.name}</h1>
          <Renderer content={event.data} />
        </div>
      </div>
      <div className="flex lg:h-screen items-center justify-center lg:flex-[0.5] mb-8 ">
        <div className="flex flex-col bg-white rounded-md shadow-md gap-4 p-4 mt-4 lg:mt-0 lg:mr-4 w-[95%] lg:w-max">
          <h2 className="text-xl font-bold text-center">Event Details</h2>
          <div className="flex flex-row items-center gap-4">
            <span className="p-2 bg-green-100 rounded-md">
              <BsFillCalendar2CheckFill className="w-6 h-6 fill-green-500" />
            </span>
            {DAYS[date.day()]}, {date.format("DD MMM YYYY")} at{" "}
            {date.format("HH:mm")}
          </div>
          <div className="flex flex-row items-center gap-4">
            <span className="bg-blue-100 rounded-md p-2">
              <AiOutlineUser className="w-6 h-6 fill-blue-500" />
            </span>
            {event.author_username}
          </div>
          <div className="flex flex-row items-center gap-4">
            <span className="p-2 bg-cyan-100 rounded-md">
              <CiLocationOn className="w-6 h-6 fill-cyan-500" />
            </span>
            {event.location}
          </div>
          <div className="flex flex-row items-center gap-4">
            <button
              className="flex flex-row bg-red-100 p-2 rounded-md"
              onClick={() => {
                if (event.is_liked) {
                  unlike();
                } else {
                  like();
                }
              }}
            >
              {event.is_liked ? (
                <AiFillHeart className="text-red-500 w-6 h-6" />
              ) : (
                <AiOutlineHeart className="w-6 h-6" />
              )}
            </button>
            {event.is_liked ? (
              <span className="text-red-500">Liked</span>
            ) : (
              <span>Like</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
