import { useEffect } from "react";
import { useUser } from "../context/user";
import { redirect } from "react-router-dom";
import { axios } from "../utils";

interface Params {
  redirectIfNoToken?: boolean;
}
export default function useHydrate(props: Params) {
  const { redirectIfNoToken } = props;
  const { setUser, user } = useUser();

  useEffect(() => {
    if (user.username) return;
    const token = localStorage.getItem("token");
    if (!token && redirectIfNoToken) return void redirect("/auth/login");
    if(!token) return;
    axios
      .get("/auth/me", { headers: { Authorization: `Token ${token}` } })
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => {
        console.log(err);
        redirect("/auth/login");
      });
  }, []);

  return null;
}
