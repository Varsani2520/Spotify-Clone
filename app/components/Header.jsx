import { Button, Grid } from '@mui/material'
import React from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const Header = () => {
    return (
        <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
                <Button startIcon={<ChevronLeftIcon />}></Button>
                <Button startIcon={<ChevronRightIcon />}></Button>
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
                        width: '100px',
                        padding: "20px", fontWeight: 'bold'
                    }}
                >
                    Login
                </Button>
            </Grid>
        </Grid>
    )
}

export default Header
