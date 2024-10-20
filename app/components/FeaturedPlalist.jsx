"use client";
import React, { useEffect, useState } from "react";
import { getAccessToken } from "../service/getTokenService";
import { getPlaylist } from "../service/getPlaylist";
import MyText from "./Common/MyText";
import MyCardSkeleton from "./Common/MyCardSkeleton";
import { IconButton } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Link from "next/link";

const FeaturedPlalist = () => {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const response = await getAccessToken();
      let accessToken = response;
      localStorage.setItem("access_token", accessToken);
      const playlistData = await getPlaylist(accessToken);
      setPlaylist(playlistData.playlists.items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }
  }

  function truncateDescription(description, maxLength) {
    const words = description.split(" ");
    return words.length > maxLength
      ? words.slice(0, maxLength).join(" ") + "..."
      : description;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div className="all-song-page" style={{ marginBlock: "50px" }}>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left Side: Charts Title */}
        <MyText
          text1={"Featured Playlists"}
          style={{ fontSize: "20px", marginLeft: "20px" }}
        />

        {/* Right Side: Show More Link */}
        <div style={{ fontSize: "16px" }}>
          <Link
            href="/section"
            style={{
              color: "#1DB954",
              textDecoration: "none",
              fontWeight: "bold",
              marginRight: "40px",
            }}
          >
            Show More
          </Link>
        </div>
      </div>

      <div className="hide-card">
        {loading ? (
          <MyCardSkeleton />
        ) : (
          <div className="playlist-container p-4">
            {playlist &&
              playlist.slice(0, 7).map((item, index) => (
                <div className="playlist-items" key={index}>
                  {item.images.length > 0 && (
                    <div className="playlist-content">
                      <Link href={`/playlists/${item.id}`}>
                        <img
                          className="playlist-image"
                          src={item.images[0].url}
                          alt="playlist-image"
                        />
                      </Link>
                      <MyText
                        text1={truncateDescription(item.name, 2)}
                        text2={truncateDescription(item.description, 3)}
                      />
                      <IconButton
                        aria-label="play"
                        className="play-icon"
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "78%",
                          transform: "translate(-50%, -50%)",
                          backgroundColor: "green",
                          display: "none",
                          borderRadius: "50%",
                          padding: "2px",
                        }}
                        size="small"
                        onClick={() => playAudio(item.audioUrl)}
                      >
                        <PlayArrowRoundedIcon
                          style={{ color: "white" }}
                          fontSize="large"
                        />
                      </IconButton>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedPlalist;
