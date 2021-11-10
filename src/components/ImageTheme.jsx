import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";

function ImageTheme() {
  return (
    <>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </>
  );
}

export default ImageTheme;
