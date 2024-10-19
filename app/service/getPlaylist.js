import { httpAxios } from "../httpAxios";

export async function getPlaylist(accessToken) {
  const response = await httpAxios.get(`/browse/featured-playlists`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  return response.data;
}

// get artists
export async function getArtists(accessToken,id) {
  const response = await httpAxios.get(`/artists/${id}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  return response.data;
}