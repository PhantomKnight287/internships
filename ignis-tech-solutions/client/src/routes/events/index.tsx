import * as Tabs from "@radix-ui/react-tabs";
import UpcomingEvents from "../../components/events/upcoming";
import { useUser } from "../../context/user";
import { useSearchParams } from "react-router-dom";
import MyEvents from "../../components/events/me";
import useHydrate from "../../hooks/hydrate";
function Events() {
  const { username } = useUser((t) => t.user);
  const [params] = useSearchParams();
  useHydrate({ redirectIfNoToken: false });

  return (
    <div className="flex items-center justify-center bg-white overflow-scroll">
      <div className="w-full mt-8 mx-6">
        <Tabs.Root
          className="flex flex-col w-full"
          defaultValue={params.get("tab") || "upcoming"}
        >
          <Tabs.List className="flex border-b-[1px]  sticky top-0" aria-label="View Events">
            <Tabs.Trigger
              className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:border-b-[2px] border-purple-500 outline-none cursor-default"
              value="upcoming"
            >
              Upcoming Events
            </Tabs.Trigger>
            {!username ? null : (
              <Tabs.Trigger
                className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:border-b-[2px] border-purple-500 outline-none cursor-default"
                value="myEvents"
              >
                Your Events
              </Tabs.Trigger>
            )}
          </Tabs.List>
          <Tabs.Content
            className="p-5 bg-white h-screen rounded-b-md outline-none  "
            value="upcoming"
          >
            <UpcomingEvents />
          </Tabs.Content>
          <Tabs.Content
            className="grow p-5 bg-white h-screen rounded-b-md outline-none  "
            value="myEvents"
          >
            <MyEvents />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}

export default Events;
