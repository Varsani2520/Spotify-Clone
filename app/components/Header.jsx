"use client";
import React, { useState } from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  Divider
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import MyIconButton from "./Common/MyIconButton";
import MyButton from "./Common/MyButton";

// Main Header Component
const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleClearSearch = () => {
    setSearchValue("");
    setIsFocused(false);
  };

  return (
    <div className="header" style={{ padding: "10px 20px" }}>
      <Grid container alignItems="center" justifyContent="space-between">
        {/* Left Section: Spotify Icon */}
        <Grid item>
          <MyIconButton
            icon={
              <img
                src="https://e1.pngegg.com/pngimages/532/220/png-clipart-spotify-for-macos-spotify-logo.png"
                alt="spotify_icon"
                className="spotify-logo"
                style={{ height: "30px" }}
              />
            }
          />
        </Grid>

        {/* Center Section: Home Icon, Search Field, and Browse */}
        <Grid item xs={12} md={6}>
          <Grid container alignItems="center" justifyContent="center">
            {/* Home Icon */}
            <MyIconButton icon={<HomeIcon />} tooltip="Home" />

            {/* Search Bar */}
            <TextField
              placeholder="What do you want to play?"
              variant="outlined"
              size="small"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => !searchValue && setIsFocused(false)}
              InputProps={{
                style: {
                  borderRadius: 30,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white"
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <MyIconButton icon={<SearchIcon />} tooltip="Search" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {/* Divider before the Browse Icon */}
                    {/* <Divider
                      orientation="vertical"
                      flexItem
                      style={{
                        height: "25px", // Adjust to fit inside text field
                        backgroundColor: "#fff",
                        marginRight: "10px" // Space between divider and icon
                      }}
                    /> */}
                    {isFocused ? (
                      <MyIconButton
                        icon={<CloseIcon />}
                        onClick={handleClearSearch}
                        tooltip="Cancel"
                      />
                    ) : (
                      <MyIconButton
                        icon={<ChevronRightIcon />}
                        tooltip="Browse"
                      />
                    )}
                  </InputAdornment>
                )
              }}
              style={{
                marginLeft: "10px",
                backgroundColor: "#282828",
                borderRadius: "30px",
                color: "white",
                width: "100%", // Full width on smaller screens
                maxWidth: "700px" // Limit maximum width on larger screens
              }}
            />
          </Grid>
        </Grid>

        {/* Right Section: SignUp and Login */}
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <MyButton title="Sign up" />
            </Grid>
            <Grid item>
              <MyButton title="Login" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
