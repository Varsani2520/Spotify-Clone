'use client'
import { Box, Grid, IconButton, Slider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SlideshowRoundedIcon from "@mui/icons-material/SlideshowRounded";
import MicIcon from "@mui/icons-material/Mic";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import VolumeDown from "@mui/icons-material/VolumeDown";
import CloseFullscreenRoundedIcon from "@mui/icons-material/CloseFullscreenRounded";
import FastForwardRoundedIcon from "@mui/icons-material/FastForwardRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";

const BottomPart = () => {
    const [currentTrackInfo, setCurrentTrackInfo] = useState(null);

    useEffect(() => {
        const storedTrackInfo = localStorage.getItem('currentTrackInfo');
        if (storedTrackInfo) {
            setCurrentTrackInfo(JSON.parse(storedTrackInfo));
        }
    }, []);
    return (
        <div style={{ background: "black", color: "white" }}>
            <Grid container spacing={3}>
                <Grid xs={12} md={4} sx={{ marginLeft: '50px' }}>
                    {currentTrackInfo && ( // Display only if there's a currently playing track
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <img
                                alt={currentTrackInfo.track.album.name}
                                src={currentTrackInfo.track.album.images[0].url}
                                style={{ height: '50px', width: '50px', borderRadius: '10px' }}
                            />

                            <Box sx={{ ml: 1.5, minWidth: 0 }}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    fontWeight={500}
                                >
                                    {currentTrackInfo.track.artists.map(artist => artist.name).join(', ')}
                                </Typography>
                                <Typography noWrap>
                                    <b>{currentTrackInfo.track.name}</b>
                                </Typography>
                                <Typography noWrap letterSpacing={-0.25}>
                                    {currentTrackInfo.track.album.name}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Grid>
                <Grid xs={12} md={4}>
                    {/* Add playback controls */}
                    {/* backward icon */}
                    <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton>
                            <FastRewindRounded sx={{ color: "gray" }} />
                        </IconButton>
                        {/* play/pause icon */}
                        <IconButton>
                            {currentTrackInfo && (
                                <PauseCircleIcon sx={{ color: "gray" }} /> // Use PauseCircleIcon if a track is currently playing
                            )}
                            {!currentTrackInfo && (
                                <PlayCircleIcon sx={{ color: "gray" }} /> // Use PlayCircleIcon if no track is playing
                            )}
                        </IconButton>
                        {/* forward icon */}
                        <IconButton>
                            <FastForwardRoundedIcon sx={{ color: "gray" }} />
                        </IconButton>
                    </div>
                    {/* volume slider */}
                    <Stack>
                        <Slider
                            aria-label="Volume"
                            sx={{
                                width: "50px",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                            }}
                        />
                    </Stack>
                </Grid>
                <Grid xs={12} md={4}>
                    {/* Other icons */}
                    <IconButton >
                        <SlideshowRoundedIcon sx={{ color: "gray" }} />
                    </IconButton>
                    <IconButton>
                        <MicIcon sx={{ color: "gray" }} />
                    </IconButton>
                    <IconButton>
                        <QueueMusicIcon sx={{ color: "gray" }} />
                    </IconButton>
                    <IconButton>
                        <PhonelinkIcon sx={{ color: "gray" }} />
                    </IconButton>
                    <IconButton>
                        <VolumeDown sx={{ color: "gray" }} />
                    </IconButton>
                    {/* Volume slider */}
                    <IconButton>
                        <Slider
                            aria-label="Volume"
                            sx={{
                                width: "150px",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                            }}
                        />
                    </IconButton>
                    <IconButton>
                        <CloseFullscreenRoundedIcon sx={{ color: "gray" }} />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
}

export default BottomPart;
