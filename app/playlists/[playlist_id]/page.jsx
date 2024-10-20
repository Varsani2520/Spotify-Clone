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
  const [hoveredTrack, setHoveredTrack] = useState(null);
  const [playingTrack, setPlayingTrack] = useState(null);
  const audioRef = useRef(new Audio());
  const [currentTrackInfo, setCurrentTrackInfo] = useState(null); // State to hold currently playing track's information

  const dispatch = useDispatch();

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

  useEffect(() => {
    // Update currentTrackInfo whenever playingTrack changes
    if (playingTrack !== null && detail) {
      const currentTrack = detail.find(
        (track) => track.track.id === playingTrack
      );
      setCurrentTrackInfo(currentTrack);
    } else {
      setCurrentTrackInfo(null);
    }
  }, [playingTrack, detail]);

  // Function to format milliseconds to duration (MM:SS)
  const formatDuration = (duration_ms) => {
    const totalSeconds = Math.floor(duration_ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Function to get time difference in days
  const getTimeDifference = (added_at) => {
    const today = new Date();
    const addedDate = new Date(added_at);
    const difference = Math.abs(today - addedDate);
    const daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return `${daysDifference} days ago`;
  };

  // Function to handle mouse enter event
  const handleMouseEnter = (trackId) => {
    setHoveredTrack(trackId);
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setHoveredTrack(null);
  };

  function songClick(track, id) {
    dispatch(addToTracks(track));
    const audio = audioRef.current;
    if (playingTrack === id) {
      audio.pause();
      setPlayingTrack(null);
    } else {
      audio.src = track.track.preview_url;
      audio.play();
      setPlayingTrack(id);
    }
  }

  return (
    <div className="page-container">
      <DetailPlaylistFirst detail={detail} loading={loading} />
      <CardPlaylistCenter />
      <DetailPlalistAlbum
        detail={playlist}
        loading={playlistLoading}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        songClick={songClick}
        playingTrack={playingTrack}
        hoveredTrack={hoveredTrack}
        getTimeDifference={getTimeDifference}
        formatDuration={formatDuration}
      />
      <Footer />
    </div>
  );
};

export default Page;
