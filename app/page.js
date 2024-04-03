"use client";
import React, { useEffect, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Header from "./components/Header";
import MyText from "./components/Common/MyText";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
export default function Home() {
  const [playlist, setPlaylist] = useState(null);
  const clientId = "22777105ec8949f59b900e7dc9f6073c";
  const clientSecret = "372948613cb241cdbacc3ecf6a72803c";

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const accessToken = await getToken(clientId, clientSecret);
        const response = await fetch(
          "https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch playlist");
        }
        const data = await response.json();
        console.log(data);
        setPlaylist(data);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    }

    async function getToken(clientId, clientSecret) {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
          },
          body: "grant_type=client_credentials",
        });
        if (!response.ok) {
          throw new Error("Failed to obtain access token");
        }
        const data = await response.json();
        return data.access_token;
      } catch (error) {
        console.error("Error fetching access token:", error);
        throw error;
      }
    }

    fetchPlaylist();
  }, []);

  return (
    <div className="card">
      <Header />
      <Grid container>
        <Grid item>
          <MyText text1={"Spotify Playlists"} />
          <div className="hide-card">
            {playlist && (
              <>
                <img
                  src={playlist.images[0].url}
                  alt="spotify-playlist"
                  style={{ borderRadius: "10px" }}
                  height="300px"
                  width="300px"
                />
                <MyText text2={playlist.name} />
              </>
            )}
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
