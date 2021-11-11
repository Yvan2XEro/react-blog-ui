import axios from "axios";
import jwtDecode from "jwt-decode";
import { removeAxiosToken, setAxiosToken } from "./http";

export function storeToken({ token }) {
  setAxiosToken(token);
  localStorage.setItem("token", token);
}

export function logout() {
  localStorage.clear();
  removeAxiosToken();
}

export async function login({ username, password }) {
  return await axios
    .post("/login_check", { username, password })
    .then((response) => {
      storeToken(response.data);
    });
}

export function getUser() {
  isAuthenticated();
  const token = localStorage.getItem("token") || null;
  if (!isAuthenticated()) return null;
  const { id, name, username, roles } = jwtDecode(token);
  return { id, name, username, roles };
}

function isValid(token) {
  return token !== null && jwtDecode(token).exp * 1000 > new Date().getTime();
}

export function isAdmin() {
  const user = getUser();
  return user !== null && user.roles.indexOf("ROLE_ADMIN") !== -1;
}

export function isAuthenticated() {
  const token = localStorage.getItem("token") || null;
  if (!token) return false;
  if (!isValid(token)) {
    localStorage.removeItem("token");
    return false;
  }
  return true;
}
