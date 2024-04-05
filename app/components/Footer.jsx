import { IconButton } from '@mui/material'
import React from 'react'
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
const Footer = () => {
    return (
        <div className="flex-container">
            <ul>
                <li style={{ color: "white" }}>Company</li>
                <li style={{ color: "gray" }}>About</li>
                <li style={{ color: "gray" }}>Job</li>
                <li style={{ color: "gray" }}>For the Record</li>
            </ul>

            <ul>
                <li style={{ color: "white" }}>Communities</li>
                <li style={{ color: "gray" }}>For Artist</li>
                <li style={{ color: "gray" }}>Developers</li>
                <li style={{ color: "gray" }}> Advertising</li>
                <li style={{ color: "gray" }}> Investors</li>
                <li style={{ color: "gray" }}> Vendors</li>
            </ul>

            <ul>
                <li style={{ color: "white" }}>Useful Links</li>
                <li style={{ color: "gray" }}>Support</li>
                <li style={{ color: "gray" }}>Free Mobile App</li>
            </ul>
            <ul className="icon-list">
                <li>
                    <IconButton
                        aria-label="instagram"
                        color="info"
                        sx={{
                            background: "#292929",
                            borderRadius: "50%",
                            marginRight: "10px",
                        }}
                    >
                        <InstagramIcon />
                    </IconButton>
                </li>
                <li>
                    <IconButton
                        aria-label="twitter"
                        color="info"
                        sx={{
                            background: "#292929",
                            borderRadius: "50%",
                            marginRight: "10px",
                        }}
                    >
                        <TwitterIcon />
                    </IconButton>
                </li>
                <li>
                    <IconButton
                        aria-label="facebook"
                        color="info"
                        sx={{
                            background: "#292929",
                            borderRadius: "50%",
                            marginRight: "10px",
                        }}
                    >
                        <FacebookIcon />
                    </IconButton>
                </li>
            </ul>
        </div>
    )
}

export default Footer
