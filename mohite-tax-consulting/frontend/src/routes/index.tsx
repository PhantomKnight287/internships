import useHydrate from "../hooks/hydrate";
import { useInfiniteQuery } from "@tanstack/react-query";
import { axios } from "../utils/axios";
import { Task } from "../types/task";
import { Fragment } from "react";
import Taskitem from "../components/shared/task-item";
import { useUser } from "../context/user";
import { Navigate } from "react-router-dom";

function RootRoute() {
  useHydrate({ redirectIfNoToken: true });
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery<{
    tasks: Task[];
    next?: number;
  }>({
    queryKey: ["tasks"],
    queryFn: async ({ pageParam = 10, signal }) => {
      return await (
        await axios.get(`/tasks?take=${pageParam}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal,
        })
      ).data;
    },
    getNextPageParam: (lastPage, _) => lastPage?.next,
  });
  const { username } = useUser((u) => u.user);
  if (!username) return <Navigate to="/auth/login" replace />;
  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center">Tasks</h1>
      {isError ? (
        <div className="text-red-500 mt-4">
          {(error as any)?.message as string}
        </div>
      ) : null}
      <div className="container flex items-center justify-center flex-col mt-8">
        {data?.pages.map((page, i) => {
          return (
            <Fragment key={i}>
              {page?.tasks?.map((task) => {
                return <Taskitem key={task.id} {...task} />;
              })}
            </Fragment>
          );
        })}
      </div>
      <div className="flex justify-between items-center">
        <div>
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </button>
        </div>
        <div className="block">{isLoading ? "Loading..." : null}</div>
        <div className="block">
          {isFetching && !isFetchingNextPage ? "Fetching..." : null}
        </div>
      </div>
    </div>
  );
}

export default RootRoute;
