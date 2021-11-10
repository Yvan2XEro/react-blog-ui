import React from "react";
import Grid from "@mui/material/Grid";
import LoginForm from "../components/LoginForm";
import ImageTheme from "../components/ImageTheme";
import { LoggedInContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage(props) {
  const { isAuthenticated, setIsAuthenticated } =
    React.useContext(LoggedInContext);
  const navigate = useNavigate();

  console.log(props);
  const handleLogin = () => {
    setIsAuthenticated(true);
    toast.success("Login success!");
    navigate("/");
  };
  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <ImageTheme />
        <LoginForm onSuccess={handleLogin} />
      </Grid>
    </>
  );
}
