import dayjs from "dayjs";
import relativePlugin from "dayjs/plugin/relativeTime";

dayjs.extend(relativePlugin);

export const fromNow = (date: string) => {
  return dayjs(date).fromNow();
};
