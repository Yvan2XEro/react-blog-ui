import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import PostsPage from "./pages/PostsPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { setup } from "./services/http";
import { LoggedInContext } from "./contexts";
import { isAuthenticated as isAuth } from "./services/authService";
import { Fragment, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowPage from "./pages/ShowPage";
import Administration from "./pages/Adminsitration";

setup();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(isAuth());

  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  const LoggedInContextValue = { isAuthenticated, setIsAuthenticated };
  const onToggleDarkTheme = () => {
    localStorage.setItem("theme", mode === "dark" ? "light" : "dark");
    setMode(mode === "dark" ? "light" : "dark");
  };
  const theme = createTheme({ palette: { mode } });

  return (
    <ThemeProvider ThemeProvider theme={theme}>
      <LoggedInContext.Provider value={LoggedInContextValue}>
        <BrowserRouter>
          <Fragment>
            <Header
              isDarkTheme={mode === "dark"}
              onToggleDarkTheme={onToggleDarkTheme}
            />
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/administration" element={<Administration />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/posts/:id" element={<ShowPage />} />
              <Route path="/posts" element={<PostsPage />} />
            </Routes>
          </Fragment>
        </BrowserRouter>
        <ToastContainer position="bottom-right" />
      </LoggedInContext.Provider>
    </ThemeProvider>
  );
}

export default App;
