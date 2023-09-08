import { Task } from "../types/task";
import { axios } from "../utils/axios";

export async function updateTask(
  task: Pick<Task, "completed" | "title" | "description">,
  slug: string
) {
  try {
    const response = await axios.patch(
      `/task/${slug}`,
      {
        ...task,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    throw new Error(
      (e as any)?.response?.data?.message ||
        (e as any).message ||
        "An Error Occured"
    );
  }
}

export async function deleteTask(slug: string) {
  try {
    const response = await axios.delete(`/task/${slug}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (e) {
    throw new Error(
      (e as any)?.response?.data?.message ||
        (e as any).message ||
        "An Error Occured"
    );
  }
}
