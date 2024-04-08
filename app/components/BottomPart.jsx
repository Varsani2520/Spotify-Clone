'use client'
import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, IconButton, Slider, Typography } from '@mui/material';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import VolumeDown from '@mui/icons-material/VolumeDown';
import SlideshowRoundedIcon from '@mui/icons-material/SlideshowRounded';
import MicIcon from '@mui/icons-material/Mic';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
const BottomPart = () => {
    ``
    const song = useSelector((state) => state.selectedTrack.currentTrack);
    const [playSong, setPlaySong] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(100)
    // Add a function to handle volume change
    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue); // Update volume state
        if (audioRef.current) {
            audioRef.current.volume = newValue / 100; // Update audio volume
        }
    };

    useEffect(() => {
        const audioElement = audioRef.current;

        // Update duration when metadata is loaded
        const handleLoadedMetadata = () => {
            setDuration(audioElement.duration);
        };

        // Update current time as the audio plays
        const handleTimeUpdate = () => {
            setCurrentTime(audioElement.currentTime);
        };

        // Add event listeners
        audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
        audioElement.addEventListener('timeupdate', handleTimeUpdate);

        // Cleanup function
        return () => {
            audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [song]);

    const toggleSong = () => {
        if (!audioRef.current) return;
        if (!playSong) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        setPlaySong(!playSong);
    };

    const handleSeek = (event, newValue) => {
        if (audioRef.current) {
            audioRef.current.currentTime = newValue;
            setCurrentTime(newValue);
        }
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };


    return (
        <div style={{ background: 'black', color: 'white' }}>

            <Grid container spacing={3}>
                {/* Left side */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '50px' }}>
                        {song ? (
                            <img
                                alt={song.track.album.name}
                                src={song.track.album.images[0].url}
                                style={{ height: '50px', width: '50px', borderRadius: '10px' }}
                            />
                        ) : ""}
                        <Box sx={{ ml: 1.5, minWidth: 0 }}>
                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                {song ? song.track.artists.map((artist) => artist.name).join(', ') : ''}
                            </Typography>
                            <Typography noWrap>
                                <b>{song ? song.track.name : ''}</b>
                            </Typography>
                            <Typography noWrap letterSpacing={-0.25}>
                                {song ? song.track.album.name : ''}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Center grid */}
                <Grid item xs={12} md={4} container justifyContent="center" alignItems="center">
                    {/* Playback controls */}

                    <IconButton onClick={toggleSong}>
                        {playSong ? <PauseCircleIcon sx={{ color: 'gray' }} /> : <PlayCircleIcon sx={{ color: 'gray' }} />}
                    </IconButton>

                    {/* Time track song slider */}
                    {formatTime(currentTime)}
                    <Slider
                        value={currentTime}
                        max={duration}
                        onChange={handleSeek}
                        aria-label="time track of song"
                        sx={{
                            width: '200px',
                            color: 'white',
                        }}
                    />
                    {formatTime(duration)}
                </Grid>

                {/* Right grid */}
                <Grid item xs={12} md={4} container justifyContent="flex-end" alignItems="center">
                    <IconButton>
                        {
                            playSong ? (<SlideshowRoundedIcon sx={{ color: 'green' }} />) : (<SlideshowRoundedIcon sx={{ color: 'gray' }} />)
                        }

                    </IconButton>
                    <IconButton>
                        <MicIcon sx={{ color: 'gray' }} />
                    </IconButton>
                    <IconButton>
                        <QueueMusicIcon sx={{ color: 'gray' }} />
                    </IconButton>
                    <IconButton>
                        <PhonelinkIcon sx={{ color: 'gray' }} />
                    </IconButton>
                    <IconButton>
                        <VolumeDown sx={{ color: 'gray' }} />
                    </IconButton>
                    {/* Volume slider */}
                    <IconButton>
                        <Slider
                            value={volume}
                            onChange={handleVolumeChange}
                            aria-label="Volume"
                            sx={{
                                width: '150px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'green',
                            }}
                        />
                    </IconButton>
                    <IconButton>
                        <CloseFullscreenRoundedIcon sx={{ color: 'gray' }} />
                    </IconButton>
                </Grid>
            </Grid>
            {/* Audio element */}
            {song && (
                <audio ref={audioRef} src={song.track.preview_url} preload="auto" />
            )}
        </div>
    );
};

export default BottomPart;
