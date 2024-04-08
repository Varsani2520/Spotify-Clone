'use client'
import { Box, Grid, IconButton, Slider, Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import VolumeDown from '@mui/icons-material/VolumeDown';
import SlideshowRoundedIcon from '@mui/icons-material/SlideshowRounded';
import MicIcon from '@mui/icons-material/Mic';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';

const BottomPart = () => {
    const song = useSelector((state) => state.selectedTrack.currentTrack);
    const [playSong, setPlaySong] = useState(false)
    const audioRef = useRef(null)
    const toggleSong = () => {
        if (!audioRef.current) return;
        if (!playSong) {
            audioRef.current.play()
        }
        else {
            audioRef.current.pause()
        }
        setPlaySong(true)
    }
    return (
        <div style={{ background: 'black', color: 'white' }}>
            <Grid container spacing={3}>
                {/* Left side */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '50px' }}>
                        {song && (
                            <img
                                alt={song.track.album.name}
                                src={song.track.album.images[0].url}
                                style={{ height: '50px', width: '50px', borderRadius: '10px' }}
                            />
                        )}
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
                    <IconButton>
                        <SkipPreviousRoundedIcon sx={{ color: 'gray' }} />
                    </IconButton>
                    <IconButton onClick={toggleSong}>
                        {playSong ? <PauseCircleIcon sx={{ color: 'gray' }} /> : <PlayCircleIcon sx={{ color: 'gray' }} />}
                    </IconButton>
                    <IconButton>
                        <FastForwardRoundedIcon sx={{ color: 'gray' }} />
                    </IconButton>
                    {/* Volume slider */}
                    <Stack>
                        <Slider
                            aria-label="speed time track of song "
                            sx={{
                                width: '50px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                            }}
                        />
                    </Stack>
                </Grid>

                {/* Right grid */}
                <Grid item xs={12} md={4} container justifyContent="flex-end" alignItems="center">
                    <IconButton>
                        <SlideshowRoundedIcon sx={{ color: 'gray' }} />
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
                            aria-label="Volume"
                            sx={{
                                width: '150px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
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
