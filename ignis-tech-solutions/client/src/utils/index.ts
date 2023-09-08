import Axios from "axios";
import { API_URL } from "../constants";

export const axios = Axios.create({
  baseURL: API_URL,
});
