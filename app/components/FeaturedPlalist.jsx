"use client";
import React, { useEffect, useState } from "react";
import { getAccessToken } from "../service/getTokenService";
import { getPlaylist } from "../service/getPlaylist";
import MyText from "./Common/MyText";
import MyCardSkeleton from "./Common/MyCardSkeleton";
import Link from "next/link";
import PlaylistCard from "./custom/PlaylistCard";

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

  useEffect(() => {
    fetchData();
  }, []);

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
              playlist
                .slice(0, 7)
                .map((item, index) => <PlaylistCard item={item} key={index} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedPlalist;
