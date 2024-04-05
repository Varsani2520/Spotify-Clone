import { Button, Grid, IconButton } from '@mui/material'
import React from 'react'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListIcon from '@mui/icons-material/List';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
const CardPlaylistCenter = () => {
    return (
        <Grid container alignItems="center" justifyContent="space-between" sx={{marginY:'20px'}}>
            <Grid item>
                <IconButton aria-label='left arrow' sx={{ marginRight: '10px', color: 'gray', marginLeft: '10px' }}>
                    <PlayCircleOutlineIcon fontSize='large' />
                </IconButton>
                <IconButton aria-label='right arrow' sx={{
                    color: 'gray',

                }}>
                    <AddCircleOutlineIcon fontSize='large' />
                </IconButton>
                <IconButton aria-label='right arrow' sx={{

                    color: 'gray',

                }}>
                    <LinearScaleIcon fontSize='large' />
                </IconButton>
            </Grid>
            <Grid item>

                <Button
                    variant="text"
                    sx={{
                        color: 'white',
                        marginRight: "10px",

                        fontWeight: 'bold'
                    }}
                >
                    List
                </Button>
                <IconButton aria-label='list menu' sx={{ color: 'gray' }}>
                    <ListIcon fontSize='large' />
                </IconButton>
            </Grid>
        </Grid >
    )
}

export default CardPlaylistCenter
