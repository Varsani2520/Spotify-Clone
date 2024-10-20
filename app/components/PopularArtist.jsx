import React, { useEffect, useState } from "react";
import { getArtists } from "../service/getPlaylist";
import { getAccessToken } from "../service/getTokenService";
import MyText from "./Common/MyText";
import Link from "next/link";

const PopularArtist = () => {
  const [artists, setArtists] = useState([]); // State to store artist data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Your Spotify access token (ensure you have a valid token)
  const artistIds = [
    "2CIMQHirSU0MQqyYHq0eOx",
    "57dN52uHvrHOxijzpIgu3E",
    "1vCWHaC5f2uS3yhpwWbIA6",
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
      <MyText
        text1={"Popular Artists"}
        style={{ fontSize: "20px", marginLeft: "20px", marginTop: "20px" }}
      />
      <div style={{ display: "flex" }}>
        {artists.map((artist) => (
          <Link
            href={`/artist/${artist.id}`}
            style={{ textDecoration: "none", color: "white" }}
            key={artist.id}
          >
            <div
              className="artist-card"
              style={{
                margin: "10px",
                width: "200px",
                height: "250px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <img
                src={artist.images[0]?.url} // Use optional chaining to avoid errors
                alt={artist.name}
                style={{
                  width: "200px",
                  height: "80%",
                  borderRadius: "50%",
                  alignItems: "center",
                }}
              />
              <p
                style={{
                  textAlign: "start",
                  marginTop: "20px",
                  textDecoration: "none",
                }}
              >
                {artist.name}
              </p>
              <p
                style={{
                  textAlign: "start",
                  color: "gray",
                  marginTop: "4px",
                  textDecoration: "none",
                }}
              >
                artist
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularArtist;
