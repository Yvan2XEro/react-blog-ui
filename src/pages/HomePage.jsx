import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ImageTheme from "../components/ImageTheme";

function HomePage() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
        pl: 6,
      }}
    >
      <Typography component="h1" variant="h3">
        Bienvennu sur le blog
      </Typography>
      <Typography component="p">
        Un mini blog reactive developpe en React JS, avec material design
      </Typography>
    </Box>
  );
}

export default HomePage;
