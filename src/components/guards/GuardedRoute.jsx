import React, { useContext } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { LoggedInContext } from "../../contexts";

export const ROLE_USER = "ROLE_USER";
export const ROLE_ADMIN = "ROLE_ADMIN";
export const ROLE_ANONIMOUS = "ROLE_ANONIMOUS";

function GuardedRoute({ path, element, role = null, children, ...rest }) {
  const { isLoggedIn } = useContext(LoggedInContext);

  return <Outlet />;
  if (isLoggedIn && role === ROLE_USER) {
    return <Route path={path} element={element} {...rest} />;
  }
  if (isLoggedIn && role == ROLE_ANONIMOUS) {
    return <Navigate to="posts" />;
  }
}

export default GuardedRoute;
