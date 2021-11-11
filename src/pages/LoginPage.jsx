import React from "react";
import Grid from "@mui/material/Grid";
import LoginForm from "../components/LoginForm";
import ImageTheme from "../components/ImageTheme";
import { LoggedInContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const { setIsAuthenticated } = React.useContext(LoggedInContext);
  const navigate = useNavigate();
  const handleLogin = () => {
    setIsAuthenticated(true);
    toast.success("Login success!");
    navigate("/posts");
  };
  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <ImageTheme />
        <LoginForm
          onSuccess={handleLogin}
          onFailure={() => toast.error("Wrong credentials")}
        />
      </Grid>
    </>
  );
}
