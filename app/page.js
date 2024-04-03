"use client";
import React, { useEffect, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
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

  async function fetchPlaylist() {
    try {
     getAccessToken().then(async (response) => {
        const playlistData = await getPlaylist(response);
        setPlaylist(playlistData);
        console.log("playlist", playlistData);
      });
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }
  }
  useEffect(() => {
    fetchPlaylist();
  }, []);

  return (
    <div className="card">
      <Header />
      <Grid container>
        <Grid item>
          <MyText text1={"Spotify Playlists"} />
          <div className="hide-card">
            {/* {playlist.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.url}
                      alt={`spotify-playlist-${index}`}
                      style={{ borderRadius: "10px", marginBottom: "10px" }}
                      height="300px"
                      width="300px"
                    />
                    <MyText text2={playlist.name} />
                  </div>
                ))} */}
          </div>
        </Grid>
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
