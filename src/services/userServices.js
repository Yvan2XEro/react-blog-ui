
import axios from 'axios'

export function findAll() {
    return axios.get('/users')
}



