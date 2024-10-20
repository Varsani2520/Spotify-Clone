"use client";

import React, { useEffect, useRef, useState } from "react";
import style from "../../style.css";
import DetailPlaylistFirst from "@/app/components/DetailPlaylistFirst";
import DetailPlalistAlbum from "@/app/components/DetailPlalistAlbum";
import CardPlaylistCenter from "@/app/components/CardPlaylistCenter";
import Footer from "@/app/components/Footer";
import { getAccessToken } from "@/app/service/getTokenService";
import { useParams } from "next/navigation";
import { getPlaylistDetails } from "@/app/service/getPlaylistDetails";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { addToTracks } from "@/app/action/action";

const Page = () => {
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

  // for playing album's song in detailed palylist

  const [playlist, setPlaylist] = useState(null);
  const [playlistLoading, setPlaylistLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        localStorage.setItem("access_token", accessToken);
        const detailData = await getPlaylistDetails(playlist_id, accessToken);
        console.log("playlist detail", detailData);
        setPlaylist(detailData.tracks.items);
        setPlaylistLoading(false);
        console.log("details", detailData.tracks.items);
      } catch (error) {
        console.error("Error fetching playlist details:", error);
      }
    };

    if (playlist_id) {
      fetchData();
    }
  }, [playlist_id]);

  return (
    <div className="page-container">
      <DetailPlaylistFirst detail={detail} loading={loading} />
      <CardPlaylistCenter />
      <DetailPlalistAlbum detail={playlist} loading={playlistLoading} />
      <Footer />
    </div>
  );
};

export default Page;
