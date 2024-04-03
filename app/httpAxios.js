import axios from "axios";

export const httpAxios = axios.create({
  baseUrl: "https://api.spotify.com/v1",
});
