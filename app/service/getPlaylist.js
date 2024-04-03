import { httpAxios } from "../httpAxios";

export async function getPlaylist(accessToken) {
  const response = await httpAxios.get(`/browse/featured-playlists`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  return response.data;
}
