import { Grid } from "@mui/material";
import React from "react";
import ImageTheme from "../components/ImageTheme";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <ImageTheme />
      <RegisterForm />
    </Grid>
  );
}

export default RegisterPage;
