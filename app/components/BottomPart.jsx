import { Box, Grid, IconButton, Slider, Stack, Typography } from '@mui/material'
import React from 'react'
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
    return (
        <div style={{ background: "black", color: "white" }}>
            <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                            alt="can't win - Chilling Sunday"
                            src="/static/images/sliders/chilling-sunday.jpg"
                        />

                        <Box sx={{ ml: 1.5, minWidth: 0 }}>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                fontWeight={500}
                            >
                                Jun Pulse
                            </Typography>
                            <Typography noWrap>
                                <b>คนเก่าเขาทำไว้ดี (Can&apos;t win)</b>
                            </Typography>
                            <Typography noWrap letterSpacing={-0.25}>
                                Chilling Sunday &mdash; คนเก่าเขาทำไว้ดี
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid xs={12} md={4}>
                    {/* backward icon */}
                    <div style={{ justifyContent: 'center', alignItems: 'center' }}>


                        <IconButton>
                            <FastRewindRounded sx={{ color: "gray" }} />
                        </IconButton>
                        {/* play icon */}
                        <IconButton>
                            <PlayCircleIcon sx={{ color: "gray" }} />
                        </IconButton>
                        {/* forward icon */}
                        <IconButton>
                            <FastForwardRoundedIcon sx={{ color: "gray" }} />
                        </IconButton>
                    </div>
                    {/* retry icon */}
                    <Stack>
                        <Slider
                            aria-label="Volume"
                            sx={{
                                width: "800px",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                            }}
                        />
                    </Stack>
                    {/* new line add music slider */}
                </Grid>
                <Grid xs={12} md={4}>
                    <IconButton sx={{ marginLeft: '300px' }}>
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

export default BottomPart
