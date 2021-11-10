import React, { useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";
import { LoggedInContext } from "./../contexts";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button, Switch } from "@mui/material";
import { logout } from "../services/authService";
import { toast } from "react-toastify";

export default function Header({ onToggleDarkTheme, isDarkTheme }) {
  const { isAuthenticated, setIsAuthenticated } = useContext(LoggedInContext);

  const handleLogout = () => {
    logout();
    toast.warn("You logged out!");
    setIsAuthenticated(false);
  };
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar position="static">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <NavLink to="/" className="nav-link" activeClassName="active">
              <HomeIcon />
            </NavLink>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink className="nav-link" activeClassName="active" to="posts">
              News
            </NavLink>
          </Typography>
          {!isAuthenticated && (
            <>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="login"
                >
                  <LoginIcon size="large" edge="start" color="inherit" />
                </NavLink>
              </IconButton>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="register"
                >
                  <PersonAddIcon />
                </NavLink>
              </IconButton>
            </>
          )}
          {isAuthenticated && (
            <Button
              className="nav-link"
              edge="start"
              color="inherit"
              onClick={() => handleLogout()}
            >
              <ExitToAppIcon size="small" />
            </Button>
          )}
          <Switch
            checked={isDarkTheme}
            onChange={onToggleDarkTheme}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Toolbar>
      </AppBar>
    </>
  );
}
