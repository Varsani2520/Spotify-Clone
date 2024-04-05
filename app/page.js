"use client";
import React from "react";
import { Grid,  } from "@mui/material";
import FeaturedPlalist from "./components/FeaturedPlalist";
export default function Home() {
  

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <FeaturedPlalist />
      </Grid>{" "}
    </Grid>
  );
}
