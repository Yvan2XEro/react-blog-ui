import axios from "axios";
import jwtDecode from "jwt-decode";

export const SERVER_HOST = "http://127.0.0.1:8000/api";

axios.defaults.baseURL = SERVER_HOST;

export function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

export function removeAxiosToken() {
  delete axios.defaults.headers["Authorization"];
}

export function setup() {
  const token = localStorage.getItem("token") || null;
  if (token) {
    const { exp } = jwtDecode(token);
    if (exp * 1000 > new Date().getTime()) setAxiosToken(token);
  }
}
