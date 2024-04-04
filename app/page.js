"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import Header from "./components/Header";
import MyText from "./components/Common/MyText";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { getAccessToken } from "./service/getTokenService";
import { getPlaylist } from "./service/getPlaylist";

export default function Home() {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      // Get the access token from localStorage
      let accessToken = localStorage.getItem("access_token");
      console.log("Access Token:", accessToken); // Check if access token is set in localStorage

      if (!accessToken) {
        // If access token is not available or expired, fetch a new one
        const response = await getAccessToken();
        accessToken = response.access_token;
        localStorage.setItem("access_token", accessToken); // Store the new access token in localStorage
      }

      // Get playlist using access token
      const playlistData = await getPlaylist(accessToken);
      setPlaylist(playlistData.playlists.items);
      console.log(playlistData.playlists.items);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching playlist:", error);
      // Handle 401 error (Unauthorized)
      if (error.response && error.response.status === 401) {
        // Clear the invalid access token from localStorage
        localStorage.removeItem("access_token");
        // Fetch a new access token
        const response = await getAccessToken();
        const newAccessToken = response.access_token;
        localStorage.setItem("access_token", newAccessToken); // Store the new access token in localStorage
        // Retry fetching the data with the new access token
        fetchData();
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="playlist-card">
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <div
            style={{ marginLeft: "20px", marginTop: "10px", fontSize: "30px" }}
          >
            <MyText text1={"Spotify Playlists"} />
          </div>
          {loading ? (
            <>
              <div className="flex-row">
                <Skeleton
                  variant="rectangular"
                  width={210}
                  height={118}
                  sx={{ backgroundColor: "black" }}
                />
                <Skeleton
                  variant="text"
                  width={210}
                  height={118}
                  sx={{ backgroundColor: "black" }}
                />
              </div>
            </>
          ) : (
            <div className="hide-card">
              {playlist &&
                playlist.map((item, index) => (
                  <div className="playlist-items" key={index}>
                    {/* Display playlist image */}
                    {item.images.length > 0 && (
                      <div className="playlist-content">
                        <img
                          height="170px"
                          style={{ borderRadius: "10px" }}
                          src={item.images[0].url}
                          alt="green iguana"
                        />
                        <MyText text1={item.name} text2={item.description} />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </Grid>
        <div className="show-card">
          {/* Overflowing items will be displayed here */}
        </div>

        {/* Add other grid items as needed */}
      </Grid>
      <div className="flex-container">
        <ul>
          <li style={{ color: "white" }}>Company</li>
          <li style={{ color: "gray" }}>About</li>
          <li style={{ color: "gray" }}>Job</li>
          <li style={{ color: "gray" }}>For the Record</li>
        </ul>

        <ul>
          <li style={{ color: "white" }}>Communities</li>
          <li style={{ color: "gray" }}>For Artist</li>
          <li style={{ color: "gray" }}>Developers</li>
          <li style={{ color: "gray" }}> Advertising</li>
          <li style={{ color: "gray" }}> Investors</li>
          <li style={{ color: "gray" }}> Vendors</li>
        </ul>

        <ul>
          <li style={{ color: "white" }}>Useful Links</li>
          <li style={{ color: "gray" }}>Support</li>
          <li style={{ color: "gray" }}>Free Mobile App</li>
        </ul>
        <ul className="icon-list">
          <li>
            <IconButton
              aria-label="delete"
              color="info"
              sx={{
                background: "#292929",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            >
              <InstagramIcon />
            </IconButton>
          </li>
          <li>
            <IconButton
              aria-label="delete"
              color="info"
              sx={{
                background: "#292929",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            >
              <TwitterIcon />
            </IconButton>
          </li>
          <li>
            <IconButton
              aria-label="delete"
              color="info"
              sx={{
                background: "#292929",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            >
              <FacebookIcon />
            </IconButton>
          </li>
        </ul>
      </div>
    </div>
  );
}
