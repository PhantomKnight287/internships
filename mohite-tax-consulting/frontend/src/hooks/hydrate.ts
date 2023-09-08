import { useEffect } from "react";
import { useUser } from "../context/user";
import { redirect, useLocation } from "react-router-dom";
import { axios } from "../utils/axios";

interface Params {
  redirectIfNoToken?: boolean;
}
export default function useHydrate(props: Params) {
  const { pathname } = useLocation();
  const { redirectIfNoToken } = props;
  const { setUser, user } = useUser();

  useEffect(() => {
    if (user.username) return;
    const token = localStorage.getItem("token");
    if (!token && redirectIfNoToken) return void redirect("/auth/login");
    if (!token) return;
    axios
      .get("/auth/me", { headers: { Authorization: `Token ${token}` } })
      .then((data) => {
        setUser(data.data.user);
      })
      .catch((err) => {
        console.log(err);
        redirect(`/auth/login?to=${pathname}`);
      });
  }, []);

  return null;
}
