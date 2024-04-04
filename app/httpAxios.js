import axios from "axios";

export const httpAxios = axios.create({
  baseURL: "https://api.spotify.com/v1",
});
