import React, { createContext } from "react";

export const LoggedInContext = createContext({
  setIsLoggedIn: (value) => {},
  isLoggedIn: true,
});
