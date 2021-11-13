
import axios from "axios"

export function findAll() {
    return axios.get("/users")
}

export function register(user) {
    return axios.post("/users", user)
}
