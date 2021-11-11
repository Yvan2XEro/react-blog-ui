import axios from "axios";

export function postComment(comment) {
  return axios.post("/comments", comment);
}

export function removeComment(id) {
  return axios.delete(`/comments/${id}`);
}
