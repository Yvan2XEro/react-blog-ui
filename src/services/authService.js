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

export function isAuthenticated() {
  const token = localStorage.getItem("token") || null;
  return token != null && jwtDecode(token).exp * 1000 > new Date().getTime();
}
