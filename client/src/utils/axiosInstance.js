import axios from 'axios'

const base_url = 'http://localhost:8888/api'
export const axiosInstance = axios.create({
  baseURL: base_url,
  headers: {
    'Content-Type': 'application/json',
  },
})
