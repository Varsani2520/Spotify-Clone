'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { getAccessToken } from '../service/getTokenService';
import { getPlaylistDetails } from '../service/getPlaylistDetails';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import style from '../style.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SkeletonType2 from './Common/SkeletonType2';
import SkeletonType3 from './Common/SkeletonType3';

const DetailPlalistAlbum = () => {
    const { playlist_id } = useParams();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hoveredTrack, setHoveredTrack] = useState(null);
    const [playingTrack, setPlayingTrack] = useState(null);
    const audioRef = useRef(new Audio());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await getAccessToken();
                localStorage.setItem('access_token', accessToken);
                const detailData = await getPlaylistDetails(playlist_id, accessToken);
                setDetail(detailData.tracks.items);
                setLoading(false);
                console.log("details", detailData.tracks.items);
            } catch (error) {
                console.error("Error fetching playlist details:", error);
            }
        };

        if (playlist_id) {
            fetchData();
        }
    }, [playlist_id]);

    // Function to format milliseconds to duration (MM:SS)
    const formatDuration = (duration_ms) => {
        const totalSeconds = Math.floor(duration_ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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

    // Function to play or stop audio
    const toggleAudio = (previewUrl, trackId) => {
        const audio = audioRef.current;
        if (trackId === playingTrack) {
            audio.pause();
            audio.currentTime = 0; // Reset the audio to the beginning
            setPlayingTrack(null);
        } else {
            audio.src = previewUrl;
            audio.play();
            setPlayingTrack(trackId);
        }
    };

    return (
        <div className='playlist-album-table'>
            {loading ? (
                <SkeletonType3 />
            ) : (
                detail && Array.isArray(detail) && (
                    <TableContainer>
                        <Table>
                            <TableHead className="fixed-header">
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Album</TableCell>
                                    <TableCell>Date Added</TableCell>
                                    <TableCell><AccessTimeIcon /></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {detail.map((track, index) => (
                                    <TableRow
                                        key={track.track.id}
                                        onMouseEnter={() => handleMouseEnter(track.track.id)}
                                        onMouseLeave={handleMouseLeave}
                                        style={{ backgroundColor: playingTrack === track.track.id ? 'lightgray' : '' }}
                                    >
                                        {/* Display play or pause icon based on hover and playing state */}
                                        <TableCell>
                                            {(hoveredTrack === track.track.id || playingTrack === track.track.id) && track.track.preview_url ? (
                                                playingTrack === track.track.id ? (
                                                    <PauseCircleOutlineIcon onClick={() => toggleAudio(track.track.preview_url, track.track.id)} sx={{ cursor: 'pointer', background: 'green', color: 'white', padding: '5px', borderRadius: '40px' }}fontSize='large' />
                                                ) : (
                                                    <PlayCircleOutlineIcon onClick={() => toggleAudio(track.track.preview_url, track.track.id)} sx={{ cursor: 'pointer', background: 'green', color: 'white' , padding: '5px', borderRadius: '50px' }} fontSize='large'/>
                                                )
                                            ) : (
                                                index + 1
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                                <img src={track.track.album.images[0].url} alt={track.track.album.name} style={{ height: '50px', width: '50px', marginRight: '20px', borderRadius: '10px' }} />
                                                <div style={{ display: 'block' }}>
                                                    <p style={{ color: 'white', fontWeight: 'bold' }}>{track.track.name}</p>
                                                    <p>{track.track.artists.map(artist => artist.name).join(', ')}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{track.track.album.name}</TableCell>
                                        <TableCell>{getTimeDifference(track.added_at)}</TableCell>
                                        <TableCell>{formatDuration(track.track.duration_ms)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            )}
            
        </div>
    );
};

export default DetailPlalistAlbum;
