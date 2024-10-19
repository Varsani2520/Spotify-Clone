import React, { useEffect, useState } from "react";
import { getArtists } from "../service/getPlaylist";
import { getAccessToken } from "../service/getTokenService";
import MyText from "./Common/MyText";

const PopularArtist = () => {
  const [artists, setArtists] = useState([]); // State to store artist data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Your Spotify access token (ensure you have a valid token)
  const artistIds = [
    "2CIMQHirSU0MQqyYHq0eOx",
    "57dN52uHvrHOxijzpIgu3E",
    "1vCWHaC5f2uS3yhpwWbIA6"
  ];

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await getAccessToken();
        let accessToken = response;
        localStorage.setItem("access_token", accessToken);

        const fetchedArtists = await Promise.all(
          artistIds.map((id) => getArtists(accessToken, id))
        );
        setArtists(fetchedArtists); // Update the state with the fetched artists
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching artists:", error);
        setError(error); // Set error if there's an issue
        setLoading(false); // Also set loading to false
      }
    };

    fetchArtists(); // Call the fetch function
  }, []); // Dependency array to ensure it runs when accessToken changes

  // Render the component
  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error fetching artists: {error.message}</div>; // Error state
  }

  return (
    <div className="all-song-page">
      <MyText text1={"Popular Artists"} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {artists.map((artist) => (
          <div
            key={artist.id}
            style={{
              margin: "10px",
              textAlign: "center",
              width: "200px",
              height: "200px"
            }}
          >
            <img
              src={artist.images[0]?.url} // Use optional chaining to avoid errors
              alt={artist.name}
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
            <p>{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularArtist;
