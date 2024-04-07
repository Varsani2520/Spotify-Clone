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
import SkeletonType3 from './Common/SkeletonType3';
import { useDispatch } from 'react-redux'
import { addToTracks } from '../action/action';
import { AddIcCallOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux'

const DetailPlalistAlbum = () => {
    const { playlist_id } = useParams();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hoveredTrack, setHoveredTrack] = useState(null);
    const [playingTrack, setPlayingTrack] = useState(null);
    const audioRef = useRef(new Audio());
    const [currentTrackInfo, setCurrentTrackInfo] = useState(null); // State to hold currently playing track's information
    const dispatch = useDispatch()
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

    useEffect(() => {
        // Update currentTrackInfo whenever playingTrack changes
        if (playingTrack !== null && detail) {
            const currentTrack = detail.find(track => track.track.id === playingTrack);
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



    function songClick(track, id) {
        dispatch(addToTracks(track));
        const audio = audioRef.current;
        if (playingTrack === id) {
            audio.pause();
            setPlayingTrack(null);
        } else {
            audio.src = track.track.preview_url;
            audio.play()
            setPlayingTrack(id);
        }
    }


    return (
        <div>
            <div className='playlist-album-table'>
                {loading ? (
                    <SkeletonType3 />
                ) : (
                    detail && Array.isArray(detail) && (
                        <TableContainer>
                            <Table>
                                <TableHead className="fixed-header">
                                    <TableRow>
                                        <TableCell style={{ color: 'white' }}>#</TableCell>
                                        <TableCell style={{ color: 'white' }}>Title</TableCell>
                                        <TableCell style={{ color: 'white' }}>Album</TableCell>
                                        <TableCell style={{ color: 'white' }}>Date Added</TableCell>
                                        <TableCell style={{ color: 'white' }}><AccessTimeIcon /></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detail.map((track, index) => (
                                        <TableRow
                                            key={track.track.id}
                                            onMouseEnter={() => handleMouseEnter(track.track.id)}
                                            onMouseLeave={handleMouseLeave}
                                            style={{ backgroundColor: playingTrack === track.track.id ? 'gray' : 'none' }}
                                        >
                                            {/* Display play or pause icon based on hover and playing state */}
                                            <TableCell style={{ color: 'gray', lineHeight: '-20px' }}>
                                                {(hoveredTrack === track.track.id || playingTrack === track.track.id) && track.track.preview_url ? (
                                                    playingTrack === track.track.id ? (
                                                        <PauseCircleOutlineIcon onClick={() => songClick(track, track.track.id)} sx={{ cursor: 'pointer', background: 'green', color: 'white', padding: '5px', borderRadius: '40px' }} fontSize='large' />
                                                    ) : (
                                                        <PlayCircleOutlineIcon onClick={() => songClick(track, track.track.id)} sx={{ cursor: 'pointer', background: 'green', color: 'white', padding: '5px', borderRadius: '50px' }} fontSize='large' />
                                                    )
                                                ) : (
                                                    index + 1
                                                )}
                                            </TableCell>
                                            <TableCell  >
                                                <div style={{ display: 'flex', marginTop: '10px' }}>
                                                    <img src={track.track.album.images[0].url} alt={track.track.album.name} style={{ height: '50px', width: '50px', marginRight: '20px', borderRadius: '10px' }} />
                                                    <div style={{ display: 'block' }}>
                                                        <p style={{ color: 'white', fontWeight: 'bold' }}>{track.track.name}</p>
                                                        <p style={{ color: 'gray' }}>{track.track.artists.map(artist => artist.name).join(', ')}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell style={{ color: 'gray' }}>{track.track.album.name}</TableCell>
                                            <TableCell style={{ color: 'gray' }}>{getTimeDifference(track.added_at)}</TableCell>
                                            <TableCell style={{ color: 'gray' }}>{formatDuration(track.track.duration_ms)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
                )}
            </div>
            {/* Pass currentTrackInfo to BottomPart component */}
            {/* <BottomPart currentTrackInfo={currentTrackInfo} /> */}
        </div>
    );
};

export default DetailPlalistAlbum;
