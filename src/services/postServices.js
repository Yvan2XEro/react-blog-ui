import axios from "axios";

export function findAll() {
  return axios.get("posts");
}

export function find(id) {
  return axios.get(`posts/${id}`);
}

export function add(data) {
  return axios.post("posts", data);
}

export function remove(id) {
  return axios.delete(`posts/${id}`);
}

export function update(id, data) {
  return axios.put(`posts/${id}`, data);
}
