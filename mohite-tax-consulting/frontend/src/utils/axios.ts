import a from "axios";
import { API_URL } from "../constants";

export const axios = a.create({
  baseURL: API_URL,
});
