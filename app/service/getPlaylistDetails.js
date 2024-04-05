import { httpAxios } from "../httpAxios";

export async function getPlaylistDetails(playlist_id, accessToken) {
  const response = await httpAxios.get(`/playlists/${playlist_id}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
  return response.data;
}
