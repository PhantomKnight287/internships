import { useEffect, useState } from "react";
import EventCard, { Event } from "../shared/event";
import useHydrate from "../../hooks/hydrate";
import { axios } from "../../utils";
import { toast } from "react-toastify";
import clsx from "clsx";
function MyEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  useHydrate({ redirectIfNoToken: false });

  useEffect(() => {
    axios
      .get<Event[]>("/events/me", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((data) => {
        setEvents(data.data);
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mx-2">
      <div
        className={clsx("flex flex-col lg:w-[50%] w-[95%]", {
          "items-center justify-center h-screen": events.length == 0,
        })}
      >
        {events.length == 0 && loading ? (
          <>
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
          </>
        ) : (
          <>
            {events.length == 0 ? (
              <div className="text-2xl font-bold text-gray-900 ">
                No events found
              </div>
            ) : (
              <>
                <h1 className="text-left font-bold text-2xl mt-20">
                  My Events
                </h1>
                {events.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MyEvents;
