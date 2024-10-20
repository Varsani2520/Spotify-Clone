"use client";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAccessToken } from "../service/getTokenService";
import { getPlaylistDetails } from "../service/getPlaylistDetails";
import { useParams } from "next/navigation";
import SkeletonType2 from "./Common/SkeletonType2";

const DetailPlaylistFirst = () => {
  const { playlist_id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        localStorage.setItem("access_token", accessToken);
        const detailData = await getPlaylistDetails(playlist_id, accessToken);
        setDetail(detailData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching playlist details:", error);
      }
    };

    if (playlist_id) {
      fetchData();
    }
  }, [playlist_id]);

  return (
    <div className="playlist-detail">
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{ textAlign: { xs: "center", md: "left" } }} // Align center on small screens, left on larger screens
      >
        {/* Image Section */}
        <Grid item xs={12} md={3} display="flex" justifyContent="center">
          {loading ? (
            <SkeletonType2 />
          ) : (
            detail &&
            detail.images.length > 0 && (
              <img
                src={detail.images[0].url}
                alt="Playlist Image"
                style={{
                  height: "100%",
                  width: "100%",
                  maxWidth: "250px",
                  maxHeight: "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            )
          )}
        </Grid>

        {/* Text Content Section */}
        <Grid item xs={12} md={9}>
          {loading ? (
            <SkeletonType2 />
          ) : (
            <>
              <p style={{ color: "inherit", fontWeight: "bold", fontSize: "16px" }}>
                {detail?.type}
              </p>
              <h1 style={{ fontSize: "2rem", margin: "10px 0" }}>{detail?.name}</h1>
              <p style={{ color: "gray", fontSize: "1rem", marginBottom: "20px" }}>
                {detail?.description}
              </p>

              {/* Spotify logo and owner details */}
              {detail && detail.owner && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src="https://e1.pngegg.com/pngimages/532/220/png-clipart-spotify-for-macos-spotify-logo.png"
                    alt="Spotify Icon"
                    style={{
                      height: "20px",
                      width: "20px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <span>{detail.owner.display_name}</span>
                  <span style={{ color: "gray" }}>{detail.followers.total} likes</span>
                </div>
              )}

              {/* Total songs and duration */}
              <p>{detail?.tracks.total} songs, about 2 hr 45 min</p>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default DetailPlaylistFirst;
