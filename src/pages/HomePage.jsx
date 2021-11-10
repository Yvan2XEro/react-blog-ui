import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

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
    </Box>
  );
}

export default HomePage;
