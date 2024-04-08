'use client'
import React, { useEffect, useState } from 'react'
import { getAccessToken } from '../service/getTokenService';
import { getPlaylist } from '../service/getPlaylist';
import MyText from './Common/MyText';
import MyCardSkeleton from './Common/MyCardSkeleton';
import { IconButton } from '@mui/material';
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Link from 'next/link'
const FeaturedPlalist = () => {
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        try {
            const response = await getAccessToken();

            // Get the access token from localStorage
            // let accessToken = localStorage.getItem("access_token");
            let accessToken = response; // Assuming response is the access token itself
            localStorage.setItem("access_token", accessToken); // Store the new access token in localStorage

            // Now you can use accessToken here

            // Get playlist using access token
            const playlistData = await getPlaylist(accessToken);
            setPlaylist(playlistData.playlists.items);
            console.log(playlistData.playlists.items);
            setLoading(false); // Set loading to false when data is fetched
        } catch (error) {
            console.error("Error fetching playlist:", error);
        }
    }

    function truncateDescription(description, maxLength) {
        const word = description.split(" ");
        if (word.length > maxLength) {
            return word.slice(0, maxLength).join(" ") + "...";
        } else {
            return description;
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    const playAudio = (audioUrl) => {
        console.log("Playing audio:", audioUrl);
        const audio = new Audio(audioUrl);
        audio.play();
    };
    return (
        <div className="all-song-page">
            <div
                style={{ marginLeft: "20px", marginTop: "10px", fontSize: "30px" }}
            >
                <MyText text1={"Spotify Playlists"} />
            </div>
            <div className="hide-card">
                {loading ? (
                    <MyCardSkeleton />
                ) : (
                    <>
                        {playlist &&
                            playlist.map((item, index) => (
                                <div className="playlist-items" key={index}>
                                    {/* Display playlist image */}
                                    {item.images.length > 0 && (
                                        <div className="playlist-content">
                                            <Link href={`/playlists/${item.id}`}>
                                                <img
                                                    height="170px"
                                                    style={{ borderRadius: "10px" }}
                                                    src={item.images[0].url}
                                                    alt="playlist-image"
                                                />
                                            </Link>
                                            <MyText
                                                text1={item.name}
                                                text2={truncateDescription(item.description, 5)}
                                            />
                                            <IconButton
                                                aria-label="play"
                                                className="play-icon"
                                                sx={{
                                                    position: "absolute",
                                                    top: "88%",
                                                    left: "78%",
                                                    transform: "translate(-50%, -50%)",
                                                    backgroundColor: "green",
                                                    display: "none",
                                                    borderRadius: "50%",
                                                    padding: "5px",
                                                }}
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
                    </>
                )}
            </div>
        </div>
    )
}

export default FeaturedPlalist
