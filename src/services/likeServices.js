import axios from "axios";
import { getUser } from "./authService";

export function postLike(post) {
  return axios.post("/likes", {
    user: `/api/users/${getUser().id}`,
    post: post["@id"],
  });
}

export function userLikedPost({ likes }) {
  const u = getUser();
  if (u === null) return false;
  for (let i = 0; i < likes.length; i++) {
    if (likes[i].user.id === u.id) {
      return true;
    }
  }
  return false;
}

function getUserLike({ likes }) {
  const u = getUser();
  if (u === null) return null;

  for (let i = 0; i < likes.length; i++) {
    if (likes[i].user.id === u.id) {
      return likes[i];
    }
  }

  return null;
}

export function unLike(post) {
  const userLike = getUserLike(post);
  if (userLike != null) return axios.delete(`/likes/${userLike.id}`);
}

export function toggleLike(post) {
  console.log("Il a like?", userLikedPost(post));
  if (userLikedPost(post)) return unLike(post);
  else return postLike(post);
}
