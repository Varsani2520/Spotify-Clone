import { Button, Grid, IconButton } from '@mui/material'
import React from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const Header = () => {
    return (
        <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
                <IconButton aria-label='left arrow' sx={{ marginRight: '10px', background: 'black', color: 'gray' ,marginLeft:'10px'}}>
                    <ChevronLeftIcon fontSize='large' />
                </IconButton>
                <IconButton aria-label='right arrow' sx={{
                    backgroundColor: 'black',
                    color: 'gray',
                   
                }}>
                    <ChevronRightIcon fontSize='large' />
                </IconButton>
            </Grid>
            <Grid item>
                <Button variant="text" sx={{ color: "gray", marginRight: "5px" }}>
                    Sign Up
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        borderRadius: "30px",
                        color: "black",
                        backgroundColor: "white",
                        marginRight: "10px",
                       
                        fontWeight: 'bold'
                    }}
                >
                    Login
                </Button>
            </Grid>
        </Grid >
    )
}

export default Header
